import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface LocalStorageContextType {
  getValue: (key: string) => string | null;
  setValue: (key: string, value: string) => void;
  subscribe: (
    key: string,
    callback: React.Dispatch<React.SetStateAction<string | null>>
  ) => void;
}

export const LocalStorageContext = createContext<
  LocalStorageContextType | undefined
>(undefined);

interface LocalStorageProviderProps {
  children: ReactNode;
}

export function LocalStorageProvider({ children }: LocalStorageProviderProps) {
  const [subscribers, setSubscribers] = useState<
    Map<string, Set<Dispatch<SetStateAction<string | null>>>>
  >(new Map());

  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key && subscribers.has(event.key)) {
        const subs = subscribers.get(event.key);
        if (subs) {
          subs.forEach((callback) => callback(event.newValue || null));
        }
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [subscribers]);

  const getValue = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  const setValue = (key: string, value: string) => {
    const oldValue = localStorage.getItem(key);
    if (oldValue !== value) {
      localStorage.setItem(key, value);
      const subs = subscribers.get(key);
      if (subs) {
        subs.forEach((callback) => callback(value));
      }
    }
  };

  const subscribe = (
    key: string,
    callback: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setSubscribers((prev) => {
      const subs = prev.get(key) || new Set();
      subs.add(callback);
      return new Map(prev).set(key, subs);
    });
  };

  return (
    <LocalStorageContext.Provider value={{ getValue, setValue, subscribe }}>
      {children}
    </LocalStorageContext.Provider>
  );
}
