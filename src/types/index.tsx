export interface UIuser {
  id?: string;
  first_name?: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}
export interface SearchDto {
  searchData: string;
}

export interface ShipmentDto {
  id: number;
  st: string;
  supply: string;
  invoice_number: string;
  invoice_issue_date: Date;
  destination: string;
  carrier: string;
  transport_mode: string;
  Valeu_invoice: number | null;
  category: string;
  name?: string | null;
  transport?: string | null;
  cpf?: string | null;
  dispatch_date?: string | null;
  dispatch_time?: string | null;
  status?: string | null;
  observation?: string | null;
  user: {
    id: string;
    first_name: string;
  };
}

export interface UpdateShipmentDto {
  st: string;
  supply: string;
  invoice_number: string;
  invoice_issue_date: Date;
  destination: string;
  carrier: string;
  transport_mode: string;
  Valeu_invoice: number | null;
  category: string;
  name?: string | null;
  transport?: string | null;
  cpf?: string | null;
  dispatch_date?: string | null;
  dispatch_time?: string | null;
  status?: string | null;
  observation?: string | null;
}

export interface IFile {
  name: string;
  size: number;
  type: string;
}

export interface UIShipmentCreate {
  file: IFile | null;
}

export interface CreateShipmentRequest {
  dataCreate: ShipmentDto[];
  dataError: ShipmentDto[];
}

export interface UpdateExpeditionShipmentDto {
  st: string;
  supply: string;
  invoice_number: string;
  invoice_issue_date: Date;
  destination: string;
  carrier: string;
  transport_mode: string;
  Valeu_invoice: number;
  category: string;
  name: string;
  transport: string;
  cpf: string;
  dispatch_date: string;
  dispatch_time: string;
  status: string;
  observation: string;
}

export interface UIExtratorDateExcel {
  data_start: string;
  date_end: string;
}

export interface UIExtratorExcel {
  valeu: string[];
}

export interface UIDashboard {
  TotalSupply: number;
  TotalSt: number;
  SomaValeu: number;
  TotalExpedition: number;
  totaisPorMes: {
    dataCompleta: string;
    count: number;
  }[];
}
