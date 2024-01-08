"use client";

import { createContext, useContext } from "react";
import type { OpenToastParams } from "./type";

export const OpenToastContext = createContext<
  (params: OpenToastParams) => void
>(() => null);

export function useToast() {
  return useContext(OpenToastContext);
}
