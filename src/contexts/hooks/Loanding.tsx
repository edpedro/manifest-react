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
  setLoading: (isLoading: boolean) => void;
  getLoadingFunctions: () => {
    setLoadingFetch: (isLoading: boolean) => void;
    setLoading: (isLoading: boolean) => void;
  };
}

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData
);

export const LoadingProvider = ({ children }: Props) => {
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Referência estável para as funções
  const loadingFunctionsRef = useRef({
    setLoadingFetch: (value: boolean) => {
      setIsLoadingFetch(value);
    },
    setLoading: (value: boolean) => {
      setIsLoading(value);
    },
  });

  // Função para expor as funções de loading
  const getLoadingFunctions = useCallback(
    () => ({
      setLoadingFetch: loadingFunctionsRef.current.setLoadingFetch,
      setLoading: loadingFunctionsRef.current.setLoading,
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

  return (
    <LoadingContext.Provider
      value={{
        isLoadingFetch,
        setLoadingFetch,
        isLoading,
        setLoading,
        getLoadingFunctions,
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
