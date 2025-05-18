export interface UIuser {
  id?: string;
  first_name?: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  type: string;
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

export interface CreateShippingDto {
  name: string;
  cpf: string;
  placa: string;
  dispatch_date: string;
  transport: string;
  estimatedArrival: string;
}

export interface UIShippingDto {
  id: number;
  name: string;
  cpf: string;
  placa: string;
  dispatch_date: string;
  transport: string;
  estimatedArrival: string;
  status: string;
  statusEmail: string;
  isConfirm: boolean;
  shipmentShipping: {
    shipment: {
      id: number;
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
    };
  }[];
}

export interface CreateManifestDto {
  shippingId: number;
  shipmentId: number[];
}
export interface DeletarManifestDto {
  shipmentId: number[];
}

export interface DeleteShipmentDto {
  id: number;
  st: string;
  supply: string;
  invoice_number: string;
}
export interface FinishManifestDto {
  dispatch_date: string;
  dispatch_time?: string;
}

export interface CreateMailDto {
  name: string;
  email: string;
}

export interface UiMailDto {
  id: number;
  name: string;
  email: string;
}
