import React from 'react';
import AppLayoutClient from './AppLayoutClient';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppLayoutClient>{children}</AppLayoutClient>;
}
