import React, { createContext, useContext, useEffect, useState } from "react";
import { getDashboardClients } from "../utils/dashboard"; // 🔥 your API

type Client = {
  id: number;

  restaurantName?: string;
  clientName?: string;
  city?: string;
  status?: string;
  paymentStatus?: string;
  nextRenewal?: string;

  email?: string;
  phone?: string;

  numberOfOutlets?: number;

  [key: string]: any;
};

type ClientsContextType = {
  clients: Client[];
  refreshClients: () => Promise<void>;
};

const ClientsContext = createContext<ClientsContextType | null>(null);


// 🔥 NORMALIZE API DATA ONLY
const normalizeClient = (client: any): Client => ({
  id: client.client_id || client.id,

  restaurantName: client.restaurant_name,
  clientName: client.client_name,

  city: client.city,
  phone: client.phone,
  email: client.email,

  numberOfOutlets: client.outlets,

  paymentStatus: client.payment_status,
  status: client.status,

  nextRenewal: client.next_renewal
});


export const ClientsProvider = ({ children }: any) => {

  const [clients, setClients] = useState<Client[]>([]);

  // 🔥 FETCH FROM API
  const refreshClients = async () => {
    try {
      const data = await getDashboardClients();

      const normalized = (data || []).map(normalizeClient);

      setClients(normalized);

    } catch (err) {
      console.error("CLIENT FETCH ERROR:", err);
      setClients([]);
    }
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    refreshClients();
  }, []);

  return (
    <ClientsContext.Provider
      value={{
        clients,
        refreshClients
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};


export const useClients = () => {

  const context = useContext(ClientsContext);

  if (!context) {
    throw new Error("useClients must be used inside ClientsProvider");
  }

  return context;
};