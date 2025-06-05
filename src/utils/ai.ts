import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";
import OpenAI from "openai";

export const embeddingModel = openai.embedding("text-embedding-ada-002");

// Initialize client lazily
let _openaiClient: OpenAI | null = null;

function getOpenAIClient() {
  if (!_openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }
    _openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return _openaiClient;
}

export async function generateEmbedding(text: string) {
  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0]?.embedding ?? [];
}

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i] ?? "", embedding: e }));
};
