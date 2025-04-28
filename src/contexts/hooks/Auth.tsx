import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useApi from "../../services/api";
import { toast } from "react-toastify";
import { UIuser } from "../../types";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./Loanding";

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
  isLoadingStorage: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (name: string, username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const [authData, setAuthData] = useState<UIuser>();
  const [token, setToken] = useState<UItoken>();
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoadingStorage, setIsLoadingStorage] = useState(true);

  const { setLoading } = useLoading();

  const api = useApi();

  const navigate = useNavigate();

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
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
    } finally {
      setIsLoadingStorage(false);
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

      if (payload.role === "user") {
        toast.error(`${payload.name} - Login não autorizado!`);
        setAuthData(undefined);
        setToken(undefined);
        setLoading(false);
        setAuthenticated(false);

        return;
      }

      setAuthData(payload);
      setToken(token);

      setAuthenticated(true);

      localStorage.setItem("@data", JSON.stringify(payload));
      localStorage.setItem("@token", JSON.stringify(token));

      api.defaults.headers.authorization = `Bearer ${token}`;
      toast.success("Login efetuado com sucesso!");
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Login e Senha invalida!");
    }
  }

  async function register(name: string, username: string, password: string) {
    try {
      await api.post("users", {
        name,
        username,
        password,
        role: "admin",
      });

      navigate("/login");

      toast.success("Cadastro efetuado com sucesso!");
    } catch (error) {
      toast.error("Informações invalida!");
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
        isLoadingStorage,
        authenticated,
        token,
        authData,
        signIn,
        signOut,
        register,
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
