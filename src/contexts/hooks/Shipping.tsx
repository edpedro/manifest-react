import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../../services/api";
import {
  CreateManifestInvoiceDto,
  CreateShippingDto,
  DeletarManifestDto,
  FinishManifestDto,
  UIShippingDto,
} from "../../types";
import { toast } from "react-toastify";
import { useLoading } from "./Loanding";

type Props = {
  children?: ReactNode;
};

interface ShippingContextData {
  shippingData?: UIShippingDto;
  shippingAllData?: UIShippingDto[];
  filterShippingData?: UIShippingDto[];
  loadShipping: () => Promise<void>;
  handleCreateShipping: (data: CreateShippingDto) => Promise<void>;
  handleCreateManifestInvoices: (
    data: CreateManifestInvoiceDto
  ) => Promise<void>;
  handleFindIdShipping: (id: number) => Promise<void>;
  handleUdpateShipping: (id: number, data: CreateShippingDto) => Promise<void>;
  handleDeleteShipping: (id: number) => void;
  handleDeleteAllManifestShipping: (id: number) => void;
  handleDeleteManifestShipping: (
    id: number,
    data: DeletarManifestDto
  ) => Promise<void>;
  handleFinishShipping: (id: number, data: FinishManifestDto) => Promise<void>;
}

const ShippingContext = createContext<ShippingContextData>(
  {} as ShippingContextData
);

export const ShippingProvider = ({ children }: Props) => {
  const [shippingData, setShippingData] = useState<UIShippingDto>();
  const [shippingAllData, setShippingAllData] = useState<UIShippingDto[]>();
  const [filterShippingData, setFilterShippingData] =
    useState<UIShippingDto[]>();

  const { setLoadingFetch, setContext, isLoadingContext } = useLoading();

  useEffect(() => {
    if (isLoadingContext) {
      loadShipping();
    }
  }, [isLoadingContext]);

  async function loadShipping(): Promise<void> {
    try {
      setLoadingFetch(true);
      const response = await api.get("/shipping");

      const { data, result } = response.data;

      const sortData = data.sort((a, b) => b.id - a.id);

      setShippingAllData(sortData);
      setFilterShippingData(result);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }

  const handleCreateShipping = useCallback(async (data: CreateShippingDto) => {
    try {
      setLoadingFetch(true);

      const result = await api.post("/shipping", data);

      setShippingData(result.data);
      setContext(true);
      toast.success("Cadastro realizado!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleFindIdShipping = useCallback(async (id: number) => {
    try {
      setLoadingFetch(true);

      const result = await api.get(`/shipping/${id}`);

      setShippingData(result.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleUdpateShipping = useCallback(
    async (id: number, data: CreateShippingDto) => {
      try {
        setLoadingFetch(true);

        const result = await api.patch(`/shipping/${id}`, data);

        setShippingData(result.data);
        setContext(true);
        toast.success("Romaneio atualizado!");
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingFetch(false);
      }
    },
    []
  );

  const handleDeleteShipping = useCallback(async (id: number) => {
    try {
      setLoadingFetch(true);

      await api.delete(`/shipping/${id}`);
      setContext(true);
      toast.success("Romaneio deletado!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleDeleteManifestShipping = useCallback(
    async (id: number, data: DeletarManifestDto) => {
      try {
        setLoadingFetch(true);

        await api.delete(`/shipping/manifest/${id}`, {
          data,
        });
        setContext(true);
        toast.success("Nota fiscal deletada!");
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingFetch(false);
      }
    },
    []
  );

  const handleFinishShipping = useCallback(
    async (id: number, data: FinishManifestDto) => {
      try {
        setLoadingFetch(true);

        await api.patch(`/shipping/status/${id}`, data);
        setContext(true);
        toast.success("Expedição finalizada");
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingFetch(false);
      }
    },
    []
  );

  const handleDeleteAllManifestShipping = useCallback(async (id: number) => {
    try {
      setLoadingFetch(true);

      await api.delete(`/shipping/manifest/all/${id}`);
      setContext(true);
      toast.success("Todas as NFs deletadas");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleCreateManifestInvoices = useCallback(
    async (data: CreateManifestInvoiceDto) => {
      try {
        setLoadingFetch(true);
        await api.post("/shipping/manifest/invoice", data);
        setContext(true);
        toast.success("Nota fiscal incluída com sucesso!");
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingFetch(false);
      }
    },
    []
  );

  return (
    <ShippingContext.Provider
      value={{
        shippingData,
        handleCreateShipping,
        shippingAllData,
        handleFindIdShipping,
        handleUdpateShipping,
        handleDeleteShipping,
        handleDeleteManifestShipping,
        loadShipping,
        handleFinishShipping,
        handleDeleteAllManifestShipping,
        filterShippingData,
        handleCreateManifestInvoices,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

export function useShipping(): ShippingContextData {
  const context = useContext(ShippingContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
