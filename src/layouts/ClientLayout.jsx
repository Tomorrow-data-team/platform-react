import { Outlet } from "react-router";
import React from "react";
import { useParams } from "react-router";
import { ClientContext } from "@/contexts/ClientContext";


function ClientLayout() {
  const client = useParams();
  //const { client, isLoading } = useClient(clientId);

  //if (isLoading) return <Spinner />;
  //if (!client) return <NotFound />;

  return (
    <ClientContext.Provider key={client.clientId}>
      <Outlet />
    </ClientContext.Provider>
  );
}

export default ClientLayout