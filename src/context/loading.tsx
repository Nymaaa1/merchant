"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
  color: string;
  setColor: (val: string) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#4341CC");

  return (
    <LoadingContext.Provider value={{ loading, setLoading, color, setColor }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
