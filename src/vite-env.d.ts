
/// <reference types="vite/client" />

// Clean, single definition for Facebook SDK
declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: () => void;
      };
      api: (path: string, method: string, callback: (response: any) => void) => void;
      AppEvents?: {
        logPageView: () => void;
      };
      init: (params: {
        appId?: string;
        version: string;
        xfbml?: boolean;
        status?: boolean;
        cookie?: boolean;
      }) => void;
      getLoginStatus: (callback: (response: any) => void) => void;
      [key: string]: any;
    }
  }
}

// Export an empty object to make this a module
export {}
