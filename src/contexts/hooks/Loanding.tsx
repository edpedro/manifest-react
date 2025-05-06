// contexts/LoadingContext.tsx
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

type Props = {
  children?: ReactNode;
};

interface LoadingContextData {
  isLoadingFetch: boolean;
  setLoadingFetch: (isLoading: boolean) => void;
  isLoading: boolean;
  isDashboard: boolean;
  setLoading: (isLoading: boolean) => void;
  setDashboard: (isLoading: boolean) => void;
  getLoadingFunctions: () => {
    setLoadingFetch: (isLoading: boolean) => void;
    setLoading: (isLoading: boolean) => void;
    setDashboard: (isLoading: boolean) => void;
  };
}

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData
);

export const LoadingProvider = ({ children }: Props) => {
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);

  // Referência estável para as funções
  const loadingFunctionsRef = useRef({
    setLoadingFetch: (value: boolean) => {
      setIsLoadingFetch(value);
    },
    setLoading: (value: boolean) => {
      setIsLoading(value);
    },

    setDashboard: (value: boolean) => {
      setIsDashboard(value);
    },
  });

  // Função para expor as funções de loading
  const getLoadingFunctions = useCallback(
    () => ({
      setLoadingFetch: loadingFunctionsRef.current.setLoadingFetch,
      setLoading: loadingFunctionsRef.current.setLoading,
      setDashboard: loadingFunctionsRef.current.setDashboard,
    }),
    []
  );

  const setLoadingFetch = useCallback((newIsLoading: boolean) => {
    setIsLoadingFetch(newIsLoading);
    loadingFunctionsRef.current.setLoadingFetch(newIsLoading);
  }, []);

  const setLoading = useCallback((newIsLoading: boolean) => {
    setIsLoading(newIsLoading);
    loadingFunctionsRef.current.setLoading(newIsLoading);
  }, []);

  const setDashboard = useCallback((newIsLoading: boolean) => {
    setIsDashboard(newIsLoading);
    loadingFunctionsRef.current.setDashboard(newIsLoading);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoadingFetch,
        setLoadingFetch,
        isLoading,
        setLoading,
        getLoadingFunctions,
        setDashboard,
        isDashboard,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export function useLoading(): LoadingContextData {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within an LoadingProvider");
  }

  return context;
}
