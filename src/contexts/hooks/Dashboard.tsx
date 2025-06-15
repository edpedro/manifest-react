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
import { DashboardDataDto, FilterSearch } from "../../types";

type Props = {
  children?: ReactNode;
};

interface DashboardContextData {
  dashboardData?: DashboardDataDto;
  loadFilterDashboard: (data?: FilterSearch) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextData>(
  {} as DashboardContextData
);

export const DashboardProvider = ({ children }: Props) => {
  const [dashboardData, setDashboardData] = useState<DashboardDataDto>();

  const { setDashboard, isLoadingContext } = useLoading();

  useEffect(() => {
    if (isLoadingContext) {
      loadFilterDashboard();
    }
  }, [isLoadingContext]);

  const loadFilterDashboard = useCallback(async (data?: FilterSearch) => {
    try {
      setDashboard(true);
      const result = await api.post("/dashboard", data ?? {});
      console.log(result.data);
      setDashboardData(result.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setDashboard(false);
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        loadFilterDashboard,
        dashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboard(): DashboardContextData {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
