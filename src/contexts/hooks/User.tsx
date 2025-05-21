import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";
import {
  EmailSend,
  ResetPasswordUser,
  UIuserList,
  UserUpdateDto,
} from "../../types";

import api from "../../services/api";
import { useLoading } from "./Loanding";

type Props = {
  children?: ReactNode;
};

interface UserContextData {
  lisUserData?: UIuserList[];
  userFindData?: UIuserList;
  listAllUserData: () => void;
  deleteUser: (id: string) => void;
  updateUser: (id: string, data: UserUpdateDto) => void;
  listUserFindOneData: (id: string) => void;
  sendMailPassword: (email: EmailSend) => void;
  resetPassword: (data: ResetPasswordUser) => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UsersProvider = ({ children }: Props) => {
  const [lisUserData, setListUserData] = useState<UIuserList[]>();
  const [userFindData, setUserFindData] = useState<UIuserList>();

  const { setLoadingFetch, isLoadingContext, setContext } = useLoading();

  useEffect(() => {
    if (isLoadingContext) {
      listAllUserData();
    }
  }, [isLoadingContext]);

  async function listAllUserData(): Promise<void> {
    try {
      setLoadingFetch(true);
      const result = await api.get("/users");

      setListUserData(result.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }

  async function listUserFindOneData(id: string) {
    try {
      const { data } = await api.get(`/users/${id}`);

      setUserFindData(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  const deleteUser = useCallback(async (id: string) => {
    try {
      setLoadingFetch(true);
      await api.delete(`/users/${id}`);

      setContext(true);

      toast.success("Deletado com sucesso.");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, newData: UserUpdateDto) => {
    try {
      setLoadingFetch(true);
      await api.patch(`/users/${id}`, newData);

      setContext(true);

      toast.success("Atualizado com sucesso.");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const sendMailPassword = useCallback(async (email: EmailSend) => {
    try {
      setLoadingFetch(true);
      await api.post("/users/forgot-password", email);

      toast.success("Email enviado com sucesso.");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const resetPassword = useCallback(async (data: ResetPasswordUser) => {
    try {
      setLoadingFetch(true);
      await api.patch("/users/reset-password", data);

      toast.success("Senha alterada com sucesso!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        updateUser,
        userFindData,
        listUserFindOneData,
        lisUserData,
        listAllUserData,
        deleteUser,
        sendMailPassword,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUsers(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
