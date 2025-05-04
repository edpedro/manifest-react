import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";
import { UIuser } from "../../types";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./Loanding";

import api from "../../services/api";

type Props = {
  children?: ReactNode;
};

interface UItoken {
  token: undefined | string;
}

interface AuthContextData {
  authData?: UIuser;
  token?: UItoken;
  authenticated: boolean;
  loadingAuth: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const [authData, setAuthData] = useState<UIuser>();
  const [token, setToken] = useState<UItoken>();
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const { setLoading, setLoadingFetch } = useLoading();

  const navigate = useNavigate();

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      setLoadingAuth(true);
      setLoadingFetch(true);

      const token = localStorage.getItem("@token");
      const data = localStorage.getItem("@data");

      if (token && data) {
        const _token: UItoken = JSON.parse(token);
        const _data: UIuser = JSON.parse(data);

        api.defaults.headers.authorization = `Bearer ${_token}`;

        setAuthenticated(true);
        setToken(_token);
        setAuthData(_data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingFetch(false);
      setLoadingAuth(false);
    }
  }

  async function signIn(username: string, password: string): Promise<void> {
    try {
      setLoading(true);

      const {
        data: { payload, token },
      } = await api.post("/auth/login", {
        username,
        password,
      });

      setAuthData(payload);
      setToken(token);
      setAuthenticated(true);
      localStorage.setItem("@data", JSON.stringify(payload));
      localStorage.setItem("@token", JSON.stringify(token));
      api.defaults.headers.authorization = `Bearer ${token}`;

      toast.success("Login efetuado com sucesso!");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error("Login e Senha invalida!");
    } finally {
      setLoading(false);
    }
  }

  async function register(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string
  ) {
    try {
      setLoading(true);

      await api.post("users", {
        first_name,
        last_name,
        email,
        password,
        username,
      });

      navigate("/login");

      toast.success("Cadastro efetuado com sucesso!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setAuthData(undefined);
    setAuthenticated(false);

    api.defaults.headers.authorization = null;

    localStorage.removeItem("@data");
    localStorage.removeItem("@token");
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        token,
        authData,
        signIn,
        signOut,
        register,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
