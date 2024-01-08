import type { ReactNode } from "react";

export type ToastItem = {
  id: string;
  type: "success" | "error";
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
  isOpen: boolean;
};

export type OpenToastParams = Omit<ToastItem, "id" | "isOpen">;
