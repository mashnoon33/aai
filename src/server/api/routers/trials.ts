import { z } from "zod";
import { listTrials, type Trial } from "@/data/trial-store";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const trials = listTrials();

// Helper function to filter trials based on search text
const filterTrialsBySearch = (trials: Trial[], searchText: string) => {
  if (!searchText) return trials;
  const searchLower = searchText.toLowerCase();
  return trials.filter((trial) =>
    Object.values(trial).some((value) =>
      value?.toLowerCase().includes(searchLower),
    ),
  );
};

// Helper function to sort trials
const sortTrials = (
  trials: Trial[],
  sortField: keyof Trial,
  sortDirection: "asc" | "desc",
) => {
  return [...trials].sort((a, b) => {
    const aValue = a[sortField]?.toLowerCase() ?? "";
    const bValue = b[sortField]?.toLowerCase() ?? "";
    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
};

export const trialRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),

        sortField: z
          .enum([
            "NCT Number",
            "Study Title",
            "Study Status",
            "Conditions",
            "Sponsor",
            "Study Type",
            "Start Date",
            "Completion Date",
          ] as const)
          .default("NCT Number"),
        sortDirection: z.enum(["asc", "desc"]).default("asc"),

        searchText: z.string().optional(),
        studyStatus: z.string().optional(),
        conditions: z.string().optional(),
        studyType: z.string().optional(),
      }),
    )
    .query(({ input }) => {
      let filteredTrials = [...trials];

      if (input.searchText) {
        filteredTrials = filterTrialsBySearch(filteredTrials, input.searchText);
      }

      if (input.studyStatus) {
        filteredTrials = filteredTrials.filter((trial) =>
          trial["Study Status"]
            .toLowerCase()
            .includes(input.studyStatus!.toLowerCase()),
        );
      }
      if (input.conditions) {
        filteredTrials = filteredTrials.filter((trial) =>
          trial.Conditions.toLowerCase().includes(
            input.conditions!.toLowerCase(),
          ),
        );
      }
      if (input.studyType) {
        filteredTrials = filteredTrials.filter((trial) =>
          trial["Study Type"]
            .toLowerCase()
            .includes(input.studyType!.toLowerCase()),
        );
      }

      // Apply sorting
      filteredTrials = sortTrials(
        filteredTrials,
        input.sortField,
        input.sortDirection,
      );

      // Calculate pagination
      const totalItems = filteredTrials.length;
      const totalPages = Math.ceil(totalItems / input.pageSize);
      const startIndex = (input.page - 1) * input.pageSize;
      const paginatedTrials = filteredTrials.slice(
        startIndex,
        startIndex + input.pageSize,
      );

      return {
        items: paginatedTrials,
        pagination: {
          totalItems,
          totalPages,
          currentPage: input.page,
          pageSize: input.pageSize,
        },
      };
    }),
});
