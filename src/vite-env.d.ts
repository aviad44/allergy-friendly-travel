
/// <reference types="vite/client" />

// Add Facebook SDK type definition
interface Window {
  FB: {
    XFBML: {
      parse: () => void;
    };
    [key: string]: any;
  }
}
