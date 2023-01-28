import { useState } from "react";

export function usePersistentState<T extends string | null>(key: string, initial: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>];
export function usePersistentState<T extends string | null>(key: string, initial?: T | (() => T)): [T | null, React.Dispatch<React.SetStateAction<T | null>>];
export function usePersistentState<T extends string | null>(key: string, initial?: T | (() => T)): [T | null, React.Dispatch<React.SetStateAction<T | null>>] {
  const [read, store] = useState<T | null>(() => 
    (localStorage.getItem(key) as T | null) ?? (typeof initial === "function" ? initial!() : initial ?? null)
  );

  return [read, (action) => store((prev) => {
    const value = typeof action === "function" ? action(prev) : action;
    if(value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
    return value;
  })];
}