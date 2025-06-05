import { findRelevantContent } from "@/lib/ai/embedding";
import { getMultipleTrialsByField } from "@/data/trial-store";
import { openai } from "@ai-sdk/openai";
import { streamText, tool, type Message } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: Message[] };

  const result = streamText({
    model: openai("gpt-4-turbo-preview"),
    messages,
    system: `You are a helpful AI assistant that provides information about clinical trials.
    Always check the knowledge base before answering any questions.
    Only respond using information from the clinical trials provided.
    If no relevant trials are found, respond with "I don't have enough information about that in my database."
    When referencing trials, always cite their NCT numbers.
    Format your responses in a clear, professional manner.`,
    tools: {
      getInformation: tool({
        description: `Search the clinical trials database for relevant information to answer the user's question. This tool only indexes on the following fields: Brief Summary, Conditions, Interventions, Primary Outcome Measures, Secondary Outcome Measures.`,
        parameters: z.object({
          question: z
            .string()
            .describe("The user's question about clinical trials"),
          limit: z
            .number()
            .describe("The number of relevant trials to return")
            .default(10),
          idOnly: z
            .boolean()
            .describe(
              "Whether to return only the NCT numbers of the relevant trials",
            )
            .default(false),
        }),
        execute: async ({ question, limit, idOnly }) =>
          findRelevantContent(question, limit, idOnly),
      }),
      getMultipleStudiesByField: tool({
        description: `Search the clinical trials database for one or more studies and return the specified fields.`,
        parameters: z.object({
          nctNumbers: z
            .array(z.string())
            .describe("The NCT numbers of the studies to search for"),
          fields: z
            .array(
              z.enum([
                "NCT Number",
                "Study Title",
                "Study URL",
                "Acronym",
                "Study Status",
                "Brief Summary",
                "Study Results",
                "Conditions",
                "Interventions",
                "Primary Outcome Measures",
                "Secondary Outcome Measures",
                "Other Outcome Measures",
                "Sponsor",
                "Collaborators",
                "Sex",
                "Age",
                "Phases",
                "Enrollment",
                "Funder Type",
                "Study Type",
                "Study Design",
                "Other IDs",
                "Start Date",
                "Primary Completion Date",
                "Completion Date",
                "First Posted",
                "Results First Posted",
                "Last Update Posted",
                "Locations",
                "Study Documents",
              ]),
            )
            .describe("The fields to search for"),
        }),
        execute: async ({ nctNumbers, fields }) =>
          getMultipleTrialsByField(nctNumbers, fields),
      }),
    },
  });

  return result.toDataStreamResponse();
}
