/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

interface Window {
  ethereum: {
    request: (...args: any[]) => Promise<any>;
  };
}
