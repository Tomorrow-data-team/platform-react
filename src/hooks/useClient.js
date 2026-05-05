import { useContext } from "react";
import { ClientProvider } from "@/contexts/ClientContext";

const useClient = () => useContext(ClientProvider);

export default useClient;