import { useContext, useEffect, useState } from 'react';
import { LocalStorageContext } from '../context/LocalStorageContext';

const useLocalStorage = (key: string, initialValue: string | null = null) => {
  const context = useContext(LocalStorageContext);

  if (!context) {
    throw new Error(
      'useLocalStorage must be used within a LocalStorageProvider'
    );
  }

  const { getValue, setValue } = context;
  const [value, setValueState] = useState<string | null>(
    getValue(key) || initialValue
  );

  useEffect(() => {
    const { subscribe } = context;
    subscribe(key, setValueState);
    if (getValue(key) === null) setValue(key, initialValue ?? '');

    return () => {
      subscribe(key, () => {}); // Clean up subscription on unmount
    };
  }, [key]);

  return [value, (newValue: string) => setValue(key, newValue)] as [
    string | null,
    (newValue: string) => void
  ];
};

export default useLocalStorage;
