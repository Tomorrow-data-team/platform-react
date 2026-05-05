import { Outlet } from 'react-router-dom';
import React from 'react';
import { ClientProvider } from '@/contexts/ClientContext';

export default function ClientLayout() {
  return (
    <ClientProvider>
          <Outlet />
    </ClientProvider>
  );
}