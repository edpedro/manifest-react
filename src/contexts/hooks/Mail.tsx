import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useLoading } from "./Loanding";
import { CreateMailDto, UiMailDto } from "../../types";

type Props = {
  children?: ReactNode;
};

interface MailContextData {
  mailAllData?: UiMailDto[];
  mailData?: UiMailDto;
  handleSedMail: (id: number) => Promise<void>;
  loadMail: () => Promise<void>;
  handleFindIdMail: (id: number) => Promise<void>;
  handleCreateMail: (data: CreateMailDto) => Promise<void>;
  handleUpdateMail: (id: number, data: CreateMailDto) => Promise<void>;
  handleDeleteMail: (id: number) => Promise<void>;
}

const MailContext = createContext<MailContextData>({} as MailContextData);

export const MailProvider = ({ children }: Props) => {
  const { setLoadingFetch, setContext } = useLoading();
  const [mailAllData, setMailAllData] = useState<UiMailDto[]>();
  const [mailData, setMailData] = useState<UiMailDto>();

  useEffect(() => {
    loadMail();
  }, []);

  async function loadMail(): Promise<void> {
    try {
      setLoadingFetch(true);
      const result = await api.get("/mail/list");

      setMailAllData(result.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }

  const handleSedMail = useCallback(async (id: number) => {
    try {
      setLoadingFetch(true);

      await api.post(`/mail/enviar/${id}`);
      setContext(true);

      toast.success("Email enviado com sucesso!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleFindIdMail = useCallback(async (id: number) => {
    try {
      setLoadingFetch(true);

      const result = await api.get(`/mail/list/${id}`);
      setMailData(result.data);
      setContext(true);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleCreateMail = useCallback(async (data: CreateMailDto) => {
    try {
      setLoadingFetch(true);

      await api.post("/mail", data);

      setContext(true);

      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleUpdateMail = useCallback(
    async (id: number, data: CreateMailDto) => {
      try {
        setLoadingFetch(true);

        await api.patch(`/mail/${id}`, data);

        setContext(true);

        toast.success("Atualziado com sucesso!");
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingFetch(false);
      }
    },
    []
  );

  const handleDeleteMail = useCallback(async (id: number) => {
    try {
      setLoadingFetch(true);

      await api.delete(`/mail/${id}`);

      setContext(true);

      toast.success("Deletado com sucesso!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  return (
    <MailContext.Provider
      value={{
        handleSedMail,
        mailAllData,
        loadMail,
        mailData,
        handleFindIdMail,
        handleCreateMail,
        handleUpdateMail,
        handleDeleteMail,
      }}
    >
      {children}
    </MailContext.Provider>
  );
};

export function useMail(): MailContextData {
  const context = useContext(MailContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
