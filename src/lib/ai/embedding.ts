import { db } from "@/server/db";
import { embeddings } from "@/server/db/schema";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { generateEmbedding } from "@/utils/ai";
import { getTrial } from "@/data/trial-store";

export const findRelevantContent = async (
  userQuery: string,
  limit = 10,
  idOnly = false,
) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded,
  )})`;

  const similarEmbeddings = await db
    .select({
      resourceId: embeddings.resourceId,
      similarity,
    })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy(desc(similarity))
    .limit(limit);

  if (idOnly) {
    return similarEmbeddings.map(({ resourceId }) => resourceId);
  }

  return similarEmbeddings
    .filter(
      (embedding): embedding is { resourceId: string; similarity: number } =>
        embedding.resourceId !== null,
    )
    .map(({ resourceId, similarity }) => {
      const trial = getTrial(resourceId);
      if (!trial) {
        console.error(`Trial not found for resourceId: ${resourceId}`);
        return null;
      }

      return {
        title: trial["Study Title"],
        nctNumber: trial["NCT Number"],
        status: trial["Study Status"],
        summary: trial["Brief Summary"],
        conditions: trial.Conditions,
        interventions: trial.Interventions,
        url: trial["Study URL"],
        similarity,
      };
    })
    .filter((result): result is NonNullable<typeof result> => result !== null);
};
