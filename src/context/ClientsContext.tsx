import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "clients_storage";

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

  address?: string;
  subscriptionPlan?: string;
  numberOfOutlets?: number;

  [key: string]: any;
};

type ClientsContextType = {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
};

const ClientsContext = createContext<ClientsContextType | null>(null);

/* ---------- NORMALIZE CLIENT ---------- */

const normalizeClient = (client: any): Client => ({
  ...client,

  restaurantName:
    client.restaurantName ||
    client.restaurantBrandName,

  clientName:
    client.clientName ||
    client.contactPersonName,

  city:
    client.city,

  phone:
    client.phone ||
    client.mobilePrimary ||
    client.secondaryContact,

  email:
    client.email ||
    client.emailPrimary ||
    client.secondaryEmail,

  nextRenewal:
    client.nextRenewal ||
    client.subscriptionEndDate,

  status:
    client.status ||
    client.onboardingStatus
});

export const ClientsProvider = ({ children }: any) => {

  const [clients, setClients] = useState<Client[]>([]);

  /* ---------- LOAD CLIENTS ---------- */

  useEffect(() => {

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {

      const parsed = JSON.parse(stored);

      setClients(parsed.map(normalizeClient));

    } else {

      const defaultClients: Client[] = [

        {
          id: 1,
          restaurantName: "The Golden Spoon",
          clientName: "Michael Chen",
          city: "San Francisco",
          status: "Active",
          paymentStatus: "Paid",
          nextRenewal: "Feb 01, 2026",
          email: "michael@goldenspoon.com",
          phone: "+1 9988776655",
          subscriptionPlan: "Pro",
          numberOfOutlets: 3,
          address: "Market Street"
        },

        {
          id: 2,
          restaurantName: "Pasta Paradise",
          clientName: "Sofia Rodriguez",
          city: "Austin",
          status: "Active",
          paymentStatus: "Due",
          nextRenewal: "Feb 10, 2026",
          email: "sofia@pastaparadise.com",
          phone: "+1 9988776644",
          subscriptionPlan: "Basic",
          numberOfOutlets: 1,
          address: "Austin Downtown"
        }

      ];

      setClients(defaultClients);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultClients)
      );

    }

  }, []);

  /* ---------- SAVE CLIENTS ---------- */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }, [clients]);

  /* ---------- ADD CLIENT ---------- */

  const addClient = (client: Client) => {

    const newClient = normalizeClient({
      id: Date.now(),
      ...client
    });

    setClients(prev => [...prev, newClient]);

  };

  /* ---------- UPDATE CLIENT (FIXED) ---------- */

  const updateClient = (updatedClient: Client) => {

    setClients(prev =>

      prev.map(client => {

        if (client.id !== updatedClient.id) return client;

        /* merge old + new data */

        const mergedClient = {
          ...client,
          ...updatedClient
        };

        /* normalize after merge */

        return normalizeClient(mergedClient);

      })

    );

  };

  return (

    <ClientsContext.Provider
      value={{
        clients,
        addClient,
        updateClient
      }}
    >
      {children}
    </ClientsContext.Provider>

  );

};

export const useClients = () => {

  const context = useContext(ClientsContext);

  if (!context) {
    throw new Error(
      "useClients must be used inside ClientsProvider"
    );
  }

  return context;

};