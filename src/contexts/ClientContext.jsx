import { createContext, useContext, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSingleClient } from 'api/clients';

const ClientContext = createContext(null);

export const useClient = () => {
  const ctx = useContext(ClientContext);
  if (!ctx) throw new Error('useClient must be used within ClientProvider');
  return ctx;
};

const slugify = (name) =>
  name.toLowerCase().replace(/\s+/g, '-');

export function ClientProvider({ children }) {
  const { clientSlug, clientId } = useParams();
  const navigate = useNavigate();

  const { data: client, isLoading, error } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => getSingleClient(clientId),
    enabled: !!clientId,
  });
  useEffect(() => {
    if (!client) return;

    const correctSlug = slugify(client.name);

    if (clientSlug !== correctSlug) {
      navigate(
        `${correctSlug}/${client.id}/overview`,
        { replace: true }
      );
    }
  }, [client, clientSlug, clientId]);
    // Fix incorrect slug


  const value = useMemo(() => ({
    clientId,
    client,
    isLoading,
    error,
  }), [clientId, client, isLoading, error]);

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
}