'use client';

import React from 'react';
import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/apollo-client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return (
    <ApolloClientProvider client={apolloClient}>
      {children}
    </ApolloClientProvider>
  );
};

export default ApolloProvider;
