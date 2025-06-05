import { generateEmbedding } from "@/utils/ai";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { resolve } from "path";
import postgres from "postgres";
import { fileURLToPath } from "url";
import { listTrials, type Trial } from "./trial-store";
import { embeddings } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

const BATCH_SIZE = 20;

const __dirname = fileURLToPath(new URL(".", import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema: { embeddings } });

type Embedding = InferSelectModel<typeof embeddings>;

function getTrialField(trial: Trial, field: keyof Trial): string {
  return trial[field] ?? "";
}

function getContentForEmbedding(trial: Trial): string {
  return [
    getTrialField(trial, "Brief Summary"),
    getTrialField(trial, "Conditions"),
    getTrialField(trial, "Interventions"),
    getTrialField(trial, "Primary Outcome Measures"),
    getTrialField(trial, "Secondary Outcome Measures"),
  ]
    .filter(Boolean)
    .join("\n\n");
}

// Database operations
async function findExistingEmbedding(
  resourceId: string,
): Promise<Embedding | undefined> {
  const result = await db
    .select()
    .from(embeddings)
    .where(eq(embeddings.resourceId, resourceId))
    .limit(1);
  return result[0];
}

async function insertEmbedding(
  resourceId: string,
  content: string,
  embedding: number[],
) {
  await db.insert(embeddings).values({ resourceId, content, embedding });
}

// Main ingestion function
async function ingestTrials() {
  const trials = listTrials();
  console.log(`Processing ${trials.length} trials...`);

  let processed = 0;
  let skipped = 0;

  for (let i = 0; i < trials.length; i += BATCH_SIZE) {
    const batch = trials.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (trial) => {
        const nctNumber = getTrialField(trial, "NCT Number");
        const resourceId = nctNumber;

        try {
          if (await findExistingEmbedding(resourceId)) {
            skipped++;
            return;
          }

          const content = getContentForEmbedding(trial);
          const embedding = await generateEmbedding(content);
          await insertEmbedding(resourceId, content, embedding);
          processed++;
        } catch (error) {
          console.error(`Error processing ${nctNumber}:`, error);
        }
      }),
    );

    // Log progress every 100 trials
    if ((i + BATCH_SIZE) % 100 === 0 || i + BATCH_SIZE >= trials.length) {
      console.log(
        `Progress: ${processed} processed, ${skipped} skipped, ${i + BATCH_SIZE} of ${trials.length} trials processed`,
      );
    }
  }

  console.log(`Ingestion complete: ${processed} processed, ${skipped} skipped`);
}

// Run the ingestion
ingestTrials().catch(console.error);
