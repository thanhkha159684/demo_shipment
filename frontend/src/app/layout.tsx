import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppLayout from '@/providers/AppLayout';
import MuiProvider from '@/providers/MuiProvider';
import ApolloProvider from '@/providers/ApolloProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Demo Shipment Frontend',
  description: 'Shipment management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider>
          <MuiProvider>
            <AppLayout>{children}</AppLayout>
          </MuiProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
