"use client";

import * as RadixToast from "@radix-ui/react-toast";
import { useCallback, useState } from "react";
import { Toast } from "./toast";
import type { OpenToastParams, ToastItem } from "./type";
import { OpenToastContext } from "./use-toast";

const genRandomId = () => Math.random().toString(32).substring(2);

type ToastProviderPros = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderPros) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const openToast = useCallback((params: OpenToastParams) => {
    const id = genRandomId();
    setToasts((prev) => [...prev, { id, isOpen: true, ...params }]);
  }, []);

  const closeToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((value) =>
        value.id === id ? { ...value, isOpen: false } : value,
      ),
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((value) => value.id !== id));
    }, 200);
  }, []);

  return (
    <OpenToastContext.Provider value={openToast}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map((value) => (
          <Toast key={value.id} value={value} onClose={closeToast} />
        ))}
        <RadixToast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </RadixToast.Provider>
    </OpenToastContext.Provider>
  );
};
