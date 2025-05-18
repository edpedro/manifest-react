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
  loadShipping: () => Promise<void>;
  handleCreateShipping: (data: CreateShippingDto) => Promise<void>;
  handleFindIdShipping: (id: number) => Promise<void>;
  handleUdpateShipping: (id: number, data: CreateShippingDto) => Promise<void>;
  handleDeleteShipping: (id: number) => void;
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

  const { setLoadingFetch, setContext, isLoadingContext } = useLoading();

  useEffect(() => {
    if (isLoadingContext) {
      loadShipping();
    }
  }, [isLoadingContext]);

  async function loadShipping(): Promise<void> {
    try {
      setLoadingFetch(true);
      const result = await api.get("/shipping");

      const sortData = result.data.sort((a, b) => b.id - a.id);

      setShippingAllData(sortData);
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
