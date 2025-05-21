import React, { ReactNode } from "react";

import { LoadingProvider } from "./hooks/Loanding";
import { AuthProvider } from "./hooks/Auth";
import { ShipmentProvider } from "./hooks/Shipment";
import { ShippingProvider } from "./hooks/Shipping";
import { MailProvider } from "./hooks/Mail";
import { UsersProvider } from "./hooks/User";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ShippingProvider>
          <ShipmentProvider>
            <MailProvider>
              <UsersProvider>{children}</UsersProvider>
            </MailProvider>
          </ShipmentProvider>
        </ShippingProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
