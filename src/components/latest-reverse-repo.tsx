import { useQuery } from "@tanstack/react-query";
import { getLatestReverseRepo } from "@/services/reverse-repo.ts";

export const LatestReverseRepo = () => {
  const {
    data: operation,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["latest-reverse-repo"],
    queryFn: getLatestReverseRepo,
  });

  if (loading)
    return <div className="p-4">Loading latest reverse repo operation...</div>;
  if (error)
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  if (!operation)
    return <div className="p-4">No reverse repo operations found</div>;

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Latest Reverse Repo Operation
      </h2>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-600">Operation Date:</span>
          <div className="font-medium">
            {new Date(operation.operationDate).toLocaleDateString()}
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-600">Maturity Date:</span>
          <div className="font-medium">
            {new Date(operation.maturityDate).toLocaleDateString()}
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-600">Term:</span>
          <div className="font-medium">{operation.term}</div>
        </div>
        <div>
          <span className="text-sm text-gray-600">Operation Method:</span>
          <div className="font-medium">{operation.operationMethod}</div>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="rounded bg-blue-50 p-3 text-center">
          <div className="text-sm text-gray-600">Total Submitted</div>
          <div className="text-lg font-semibold">
            ${operation.totalAmtSubmitted.toLocaleString()}
          </div>
        </div>
        <div className="rounded bg-green-50 p-3 text-center">
          <div className="text-sm text-gray-600">Total Accepted</div>
          <div className="text-lg font-semibold">
            ${operation.totalAmtAccepted.toLocaleString()}
          </div>
        </div>
        <div className="rounded bg-yellow-50 p-3 text-center">
          <div className="text-sm text-gray-600">Award Rate</div>
          <div className="text-lg font-semibold">
            {operation.details[0]?.percentAwardRate.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-600">Counterparties:</span>
          <div className="font-medium">
            {operation.participatingCpty} ({operation.acceptedCpty} awarded)
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-600">Settlement Type:</span>
          <div className="font-medium">{operation.settlementType}</div>
        </div>
      </div>
    </div>
  );
};
