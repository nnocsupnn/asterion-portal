import { useCallback } from "react";

export function formatCurrencyPH(value) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
}