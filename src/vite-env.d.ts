
/// <reference types="vite/client" />

// Clean, single definition for Facebook SDK
declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: () => void;
      };
      [key: string]: any;
    }
  }
}

// Export an empty object to make this a module
export {}
