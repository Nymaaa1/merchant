// src/types/react-auto-tab.d.ts
declare module 'react-auto-tab' {
    import React from 'react';
  
    interface AutoTabProviderProps {
      className?: string;
      id?: string;
      style?: React.CSSProperties;
      settings?: {
        placement?: number;
        tabOnChange?: boolean;
        tabOnMax?: boolean;
        tabOnKeys?: string[];
        backTabOnKeys?: string[];
        pasteToFit?: boolean;
        maxLength?: number;
      };
      children: React.ReactNode;
    }
  
    export const AutoTabProvider: React.FC<AutoTabProviderProps>;
  }
  