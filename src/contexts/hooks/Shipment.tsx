import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  CreateManifestDto,
  CreateShipmentRequest,
  SearchDto,
  ShipmentDto,
  UIDashboard,
  UIExtratorDateExcel,
  UIExtratorExcel,
  UIShipmentCreate,
  UpdateShipmentDto,
} from "../../types";
import { useLoading } from "./Loanding";

import api from "../../services/api";
import { toast } from "react-toastify";

type Props = {
  children?: ReactNode;
};

interface ShipmentContextData {
  searchData?: ShipmentDto[];
  shipmentData?: ShipmentDto;
  dashData?: UIDashboard;
  createShipment?: CreateShipmentRequest;
  search: (SearchData: SearchDto) => Promise<void>;
  setDataSearch: (data: ShipmentDto[]) => void;
  handleFindshipment: (id: number) => Promise<void>;
  handleUpdateShipment: (id: number, data: UpdateShipmentDto) => Promise<void>;
  handleDeleteShipment: (id: number) => Promise<void>;
  modelInput: () => void;
  handleCreateShipment: (data: UIShipmentCreate) => Promise<void>;
  setCreateShipmentData: (data: CreateShipmentRequest) => Promise<void>;
  modelInputExpedition: () => void;
  handleUpdateExpeditionShipment: (data: UIShipmentCreate) => Promise<void>;
  extratorDateExcel: (data: UIExtratorDateExcel) => Promise<void>;
  extratorSTSupplysExcel: (data: UIExtratorExcel) => Promise<void>;
  loadDashboard: () => Promise<void>;
  searchInvoiceShipping: (
    SearchData: SearchDto,
    shippingId: number
  ) => Promise<void>;
}

const ShipmentContext = createContext<ShipmentContextData>(
  {} as ShipmentContextData
);

export const ShipmentProvider = ({ children }: Props) => {
  const [searchData, setSearchData] = useState<ShipmentDto[]>([]);
  const [shipmentData, setShipmentData] = useState<ShipmentDto>();
  const [createShipment, createSetShipment] = useState<CreateShipmentRequest>();
  const [dashData, setDashData] = useState<UIDashboard>();

  const { setLoadingFetch, setDashboard, setContext, isLoadingContext } =
    useLoading();

  useEffect(() => {
    if (isLoadingContext) {
      loadDashboard();
      setContext(false);
    }
  }, [isLoadingContext]);

  const setDataSearch = (data: ShipmentDto[]) => {
    setSearchData(data);
  };

  const setCreateShipmentData = async (
    data: CreateShipmentRequest
  ): Promise<void> => {
    createSetShipment(data);
  };

  const search = useCallback(async (SearchData: SearchDto) => {
    try {
      setLoadingFetch(true);
      const result = await api.post("/shipment/search", SearchData);

      if (result.data.length <= 0) {
        toast.error("Dados não encontrados");
      }

      setDataSearch(result.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleFindshipment = useCallback(async (id: number) => {
    try {
      setLoadingFetch(true);

      const result = await api.get(`/shipment/${id}`);

      setShipmentData(result.data);
      setContext(true);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleUpdateShipment = useCallback(
    async (id: number, data: UpdateShipmentDto) => {
      try {
        setLoadingFetch(true);

        const result = await api.patch(`/shipment/${id}`, data);

        setDataSearch([result.data]);
        setContext(true);
        toast.success("Atualizado com sucesso!");
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingFetch(false);
      }
    },
    []
  );

  const handleDeleteShipment = useCallback(async (id: number) => {
    try {
      setLoadingFetch(true);
      await api.delete(`/shipment/${id}`);

      const result = searchData.filter((item) => item.id !== id);

      setDataSearch(result);
      setContext(true);
      toast.success("Deletado com sucesso!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const modelInput = useCallback(async () => {
    try {
      setLoadingFetch(true);
      const response = await api.get("/shipment/model/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "lista_modelo.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download realizado!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleCreateShipment = useCallback(async (data: UIShipmentCreate) => {
    try {
      setLoadingFetch(true);

      const result = await api.post("/shipment", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCreateShipmentData(result.data);
      setContext(true);
      toast.success("Upload realizado com sucesso!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const modelInputExpedition = useCallback(async () => {
    try {
      setLoadingFetch(true);
      const response = await api.get("/shipment/expedition/model/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "lista_modelo_expedição.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download realizado!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleUpdateExpeditionShipment = useCallback(
    async (data: UIShipmentCreate) => {
      try {
        setLoadingFetch(true);

        const result = await api.post("/shipment/expedition", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setCreateShipmentData(result.data);
        setContext(true);
        toast.success("Upload realizado com sucesso!");
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingFetch(false);
      }
    },
    []
  );

  const extratorDateExcel = useCallback(async (data: UIExtratorDateExcel) => {
    try {
      setLoadingFetch(true);
      const response = await api.post("/shipment/date/export", data, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const numbers = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 101)
      );

      link.setAttribute("download", `lista${numbers.join("")}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download realizado!");
    } catch (error) {
      if (error.response && error.response.data instanceof Blob) {
        const text = await error.response.data.text(); // converte o blob de erro em string
        try {
          const json = JSON.parse(text); // tenta converter para JSON
          toast.error(json.message || "Erro desconhecido");
        } catch {
          toast.error("Erro inesperado no servidor.");
        }
      } else {
        toast.error("Erro na conexão com o servidor.");
      }
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const extratorSTSupplysExcel = useCallback(async (data: UIExtratorExcel) => {
    try {
      setLoadingFetch(true);
      const response = await api.post("/shipment/export", data, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const numbers = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 101)
      );

      link.setAttribute("download", `lista${numbers.join("")}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download realizado!");
    } catch (error) {
      if (error.response && error.response.data instanceof Blob) {
        const text = await error.response.data.text(); // converte o blob de erro em string
        try {
          const json = JSON.parse(text); // tenta converter para JSON
          toast.error(json.message || "Erro desconhecido");
        } catch {
          toast.error("Erro inesperado no servidor.");
        }
      } else {
        toast.error("Erro na conexão com o servidor.");
      }
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  async function loadDashboard(): Promise<void> {
    try {
      setDashboard(true);
      const result = await api.get("/shipment/data/dashboard");

      setDashData(result.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setDashboard(false);
    }
  }

  const searchInvoiceShipping = useCallback(
    async (SearchData: SearchDto, id: number) => {
      try {
        setLoadingFetch(true);
        const result = await api.post("/shipment/search", SearchData);

        if (result.data.length <= 0) {
          toast.error("Dados não encontrados");
        }

        const shippingId = id;
        const shipmentId = result.data.map((item) => item.id);

        const data: CreateManifestDto = {
          shippingId,
          shipmentId,
        };
        if (shipmentId.length > 0) {
          await api.post("/shipping/manifest", data);
          setContext(true);
          toast.success("Nota fiscal incluída!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingFetch(false);
      }
    },
    []
  );

  return (
    <ShipmentContext.Provider
      value={{
        searchData,
        search,
        setDataSearch,
        handleFindshipment,
        shipmentData,
        handleUpdateShipment,
        handleDeleteShipment,
        modelInput,
        handleCreateShipment,
        createShipment,
        setCreateShipmentData,
        modelInputExpedition,
        handleUpdateExpeditionShipment,
        extratorDateExcel,
        extratorSTSupplysExcel,
        loadDashboard,
        dashData,
        searchInvoiceShipping,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};

export function useShipment(): ShipmentContextData {
  const context = useContext(ShipmentContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
