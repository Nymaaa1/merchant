export interface AgeCount {
  ageType: string;
  count: number;
}

export interface DistrictGraphic {
  district: string;
  count: number;
}

export interface DistrictGraphicResponse {
  code: string;
  intCode: number;
  info: string;
  result: DistrictGraphic[];
}

export interface GenderGraphicResponse {
  code: string;
  intCode: number;
  info: string;
  result: GenderGraphic[];
}

export interface GenderGraphic {
  date: string;
  saleFemale: number;
  saleMale: number;
}

export interface SalesGraphic {
  partnerId: number;
  sellToday: number;
  sellAvg: number;
  txnToday: number;
  txnAvg: number;
  customerToday: number;
  customerAvg: number;
}


export interface SalesPartnerGraphic {
  totalAmount: number;
  totalCount: number;
  customerCount: number;
  xaxis: string;
}