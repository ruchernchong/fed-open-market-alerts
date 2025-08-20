export interface OperationDetail {
  securityType: string;
  amtSubmitted: number;
  amtAccepted: number;
  percentOfferingRate: number;
  percentAwardRate: number;
}

export interface Operation {
  operationId: string;
  auctionStatus: string;
  operationDate: string;
  settlementDate: string;
  maturityDate: string;
  operationType: string;
  operationMethod: string;
  settlementType: string;
  termCalenderDays: number;
  term: string;
  releaseTime: string;
  closeTime: string;
  note: string;
  lastUpdated: string;
  participatingCpty: number;
  acceptedCpty: number;
  totalAmtSubmitted: number;
  totalAmtAccepted: number;
  details: OperationDetail[];
}

export interface FedMarketsResponse {
  repo: {
    operations: Operation[];
  };
}
