export interface UIuserList {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  type: string;
}

export interface CreateUser {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  type: string;
}

export interface ResetPasswordUser {
  token: string;
  password: string;
}

export interface EmailSend {
  email: string;
}

export interface UserUpdateDto {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  type?: string;
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
  city: string;
  uf: string;
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
  cor?: string;
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
  city: string;
  uf: string;
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
  city: string;
  uf: string;
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
      city: string;
      uf: string;
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

export interface CreateManifestInvoiceDto {
  shippingId: number;
  search: string;
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

export type Status = "gray" | "success" | "warning" | "error";

export interface DashboardDataDto {
  TotalSupply: number;
  TotalSt: number;
  SomaValeu: number;
  TotalExpedition: number;
  groupedInvoices: GroupedInvoiceData[];
  categoryTotal: Category[];
  top10InvoiceUfTotal: UF[];
  top10InvoiceCityTotal: City[];
  top10InvoiceTransportTotal: Transport[];
  invoiceTotal3: number;
  top5InvoiceTransportValueTotal: TransportValue[];
  timeShippinng: { hora: string; total: number }[];
  media: number;
  modalTotal: Modal[];
  driver: number;
}

export interface GroupedInvoiceData {
  invoice_issue_date: string;
  invoice: number;
  dispatched: number;
}

export interface Category {
  name: string;
  total: number;
}
export interface UF {
  name: string;
  total: number;
}
export interface City {
  name: string;
  total: number;
}
export interface Transport {
  name: string;
  total: number;
}
export interface TransportValue {
  name: string;
  valeu: number;
}

export interface Modal {
  name: string;
  total: number;
}

export interface FilterSearch {
  category?: string;
  month?: string;
  status?: string;
  transport_mode?: string;
  transport_mode_carrier?: string;
  city?: string;
  transportEnd?: string;
  dateStart?: string;
  dateEnd?: string;
  uf?: string;
}

export interface FilteredValuesUi {
  month: string[];
  city: string[];
  uf: string[];
  carrier: string[];
  transport_mode: string[];
  category: string[];
  transport: string[];
  status: string[];
}
