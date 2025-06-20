import '@onlook/ui/globals.css';
import './global.css';

import { RootProvider } from 'fumadocs-ui/provider';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Onlook',
    description: 'Onlook Documentation',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning data-oid="hy1qqpw">
            <body className="flex flex-col min-h-screen" data-oid="gi-1lis">
                <RootProvider data-oid="4b49eex">{children}</RootProvider>
            </body>
        </html>
    );
}
