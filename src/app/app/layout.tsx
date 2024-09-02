
"use client"
import React from "react";
import { SSRProvider } from "react-bootstrap";
// import { SSRProvider } from '@react-aria/ssr';

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({
    children,
}: Readonly<RootLayoutProps>) {
    return (
        <SSRProvider>
            {children}
        </SSRProvider>
    );
}

