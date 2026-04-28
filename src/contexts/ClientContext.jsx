import React, { useEffect } from "react";
import { Outlet } from "react-router";

import clientItems from "@/components/sidebar/clientItems";

const initialState = {
  client: "Peacocks",
  setClient: () => {},
};

const ClientContext = React.createContext(initialState);

function ClientProvider({ children }) {
  const [client, setClient] = React.useState(initialState.client);

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      {children}
      <Outlet />
    </ClientContext.Provider>
  );
} 

export { ClientProvider, ClientContext };
