import React, { ReactNode } from "react";

import { LoadingProvider } from "./hooks/Loanding";
import { AuthProvider } from "./hooks/Auth";
import { ShipmentProvider } from "./hooks/Shipment";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ShipmentProvider>{children}</ShipmentProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
