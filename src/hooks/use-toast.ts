
import { useState, useEffect, useCallback } from "react";

type ToastType = "default" | "destructive" | "success";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: ToastType;
  duration?: number;
}

interface UseToastReturn {
  toasts: Toast[];
  toast: (props: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
}

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (props: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { id, ...props };
      setToasts((toasts) => [...toasts, newToast]);

      if (props.duration !== Infinity) {
        setTimeout(() => {
          dismiss(id);
        }, props.duration || 5000);
      }

      return id;
    },
    [dismiss]
  );

  // Clear all toasts when the component unmounts
  useEffect(() => {
    return () => {
      setToasts([]);
    };
  }, []);

  return {
    toasts,
    toast,
    dismiss,
  };
};

// Export a standalone toast function for use outside of React components
export const toast = (props: Omit<Toast, "id">) => {
  const event = new CustomEvent("toast", { detail: props });
  document.dispatchEvent(event);
};
