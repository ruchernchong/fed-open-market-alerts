import type { FedMarketsResponse, Operation } from "../types/reverse-repo.ts";

const FED_MARKETS_API_BASE =
  "https://markets.newyorkfed.org/api/rp/reverserepo/all/results";

export const getLastTwoWeeks = async (): Promise<FedMarketsResponse> => {
  const response = await fetch(`${FED_MARKETS_API_BASE}/lastTwoWeeks.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Fed Markets data: ${response.statusText}`);
  }

  return response.json();
};

export const getLatestReverseRepo = async (): Promise<Operation | null> => {
  try {
    const data = await getLastTwoWeeks();

    const reverseRepoOps = data.repo.operations;

    return reverseRepoOps[0] ?? null;
  } catch (error) {
    console.error("Error fetching latest reverse repo operation:", error);
    throw error;
  }
};
