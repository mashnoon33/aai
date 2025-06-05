// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, pgTableCreator } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `argon_${name}`);

export const embeddings = createTable(
  "embeddings",
  (d) => ({
    id: d
      .varchar({ length: 21 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    resourceId: d.varchar({ length: 11 }).notNull().unique(),
    content: d.text().notNull(),
    embedding: d.vector({ dimensions: 1536 }).notNull(),
  }),
  (t) => ({
    embeddingIndex: index("embeddingIndex").using(
      "hnsw",
      t.embedding.op("vector_cosine_ops"),
    ),
  }),
);
