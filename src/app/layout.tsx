interface GenerationMetaData {
    children: React.ReactNode;
}

export function generateMetadata({
}: Readonly<GenerationMetaData>) {
    return {
        title: "MonPay",
        icons: {
            icon: [
                {
                    rel: "icon",
                    media: "(prefers-color-scheme: light)",
                    type: "image/png",
                    url: "/logo/logo.png"
                },
                {
                    rel: "icon",
                    media: "(prefers-color-scheme: dark)",
                    type: "image/png",
                    url: "/logo/logo.png"
                },
            ],
        },
    };
}

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import '@/styles/responsive.css';
import React from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { IctProvider } from '@/context/ict-context';
import { SSRProvider } from '@react-aria/ssr';

interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}
export default function RootLayout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const messages = useMessages();
    return (
        <html lang={locale}>
            <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
                {/* <SSRProvider> */}
                    <NextIntlClientProvider messages={messages}>
                        <IctProvider>
                            {children}
                        </IctProvider>
                    </NextIntlClientProvider>
                {/* </SSRProvider> */}
            </body>
        </html>
    );
}

