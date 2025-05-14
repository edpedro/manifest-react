import { createContext, ReactNode, useCallback, useContext } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useLoading } from "./Loanding";

type Props = {
  children?: ReactNode;
};

interface MailContextData {
  handleSedMail: (id: number) => Promise<void>;
}

const MailContext = createContext<MailContextData>({} as MailContextData);

export const MailProvider = ({ children }: Props) => {
  const { setLoadingFetch, setContext } = useLoading();

  const handleSedMail = useCallback(async (id: number) => {
    try {
      setLoadingFetch(true);
      setContext(true);
      await api.post(`/mail/enviar/${id}`);

      toast.success("Email enviado com sucesso!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setContext(false);
      setLoadingFetch(false);
    }
  }, []);

  return (
    <MailContext.Provider
      value={{
        handleSedMail,
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
