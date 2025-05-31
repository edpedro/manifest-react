import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

import { toast } from "react-toastify";
import { UIuserList, UserUpdateDto } from "../../types";
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
  authData?: UIuserList;
  token?: UItoken;
  authenticated: boolean;
  loadingAuth: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  updateUserAuth: (id: string, data: UserUpdateDto) => void;
  signOut: () => Promise<void>;
  register: (
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    type: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const [authData, setAuthData] = useState<UIuserList>();
  const [token, setToken] = useState<UItoken>();
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const { setLoading, setLoadingFetch } = useLoading();
  const navigate = useNavigate();

  const lastCheckRef = useRef<number>(0);
  const isCheckingRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const CHECK_INTERVAL = 30000; // 30 segundos
  const THROTTLE_DELAY = 1000; // 1 segundo

  useEffect(() => {
    loadStorageData();
  }, []);

  const checkUserRoleChange = useCallback(async () => {
    if (!authData || isCheckingRef.current) return;

    const now = Date.now();
    const timeSinceLastCheck = now - lastCheckRef.current;

    if (timeSinceLastCheck < CHECK_INTERVAL) return;

    try {
      isCheckingRef.current = true;

      const response = await api.get(`users/${authData.id}`);

      if (response.data.type !== authData.type) {
        toast.warn("Sua permissão foi alterada. Faça login novamente.");
        await signOut();
        navigate("/login");
      }

      lastCheckRef.current = now;
    } catch (error) {
      console.error(
        "Erro ao verificar mudança de role:",
        error?.message || error
      );
    } finally {
      isCheckingRef.current = false;
    }
  }, [authData]);

  const handleUserActivity = useCallback(() => {
    if (!authenticated) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      checkUserRoleChange();
    }, THROTTLE_DELAY);
  }, [authenticated, checkUserRoleChange]);

  useEffect(() => {
    if (!authenticated) return;

    const events = ["keydown", "mousemove"];

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    const handleVisibilityChange = () => {
      if (!document.hidden && authenticated) {
        handleUserActivity();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [authenticated, handleUserActivity]);

  async function loadStorageData(): Promise<void> {
    try {
      setLoadingAuth(true);
      setLoadingFetch(true);

      const tokenStorage = localStorage.getItem("@token");
      const userStorage = localStorage.getItem("@data");

      if (tokenStorage && userStorage) {
        const _token: UItoken = JSON.parse(tokenStorage);
        const _data: UIuserList = JSON.parse(userStorage);

        api.defaults.headers.authorization = `Bearer ${_token}`;

        setAuthenticated(true);
        setToken(_token);
        setAuthData(_data);
        lastCheckRef.current = Date.now();
      }
    } catch (error) {
      console.error(
        "Erro ao carregar dados do storage:",
        error?.message || error
      );
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
      } = await api.post("/auth/login", { username, password });

      setAuthData(payload);
      setToken(token);
      setAuthenticated(true);

      localStorage.setItem("@data", JSON.stringify(payload));
      localStorage.setItem("@token", JSON.stringify(token));

      api.defaults.headers.authorization = `Bearer ${token}`;
      lastCheckRef.current = Date.now();

      toast.success("Login efetuado com sucesso!");

      navigate(payload.type === "driver" ? "/romaneio" : "/");
    } catch (error) {
      console.error("Erro ao fazer login:", error?.message || error);
      toast.error("Login ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  }

  async function register(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    type: string
  ) {
    try {
      setLoading(true);

      await api.post("users", {
        first_name,
        last_name,
        email,
        password,
        username,
        type,
      });

      navigate("/login");
      toast.success("Cadastro efetuado com sucesso!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Erro ao cadastrar usuário."
      );
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAuthData(undefined);
    setAuthenticated(false);

    delete api.defaults.headers.common["Authorization"];

    localStorage.removeItem("@data");
    localStorage.removeItem("@token");

    lastCheckRef.current = 0;
    isCheckingRef.current = false;
  }

  const updateUserAuth = useCallback(
    async (id: string, newData: UserUpdateDto) => {
      try {
        setLoadingFetch(true);
        setLoadingAuth(true);
        const result = await api.patch(`/users/${id}`, newData);

        localStorage.removeItem("@data");

        localStorage.setItem("@data", JSON.stringify(result.data));

        setAuthData(result.data);

        toast.success("Atualizado com sucesso.");
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoadingAuth(false);
        setLoadingFetch(false);
      }
    },
    []
  );

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
        updateUserAuth,
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
