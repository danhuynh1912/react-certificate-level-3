import { useContext, useEffect, useState } from 'react';
import { LocalStorageContext } from '../context/LocalStorageContext';

const initialValue = '';

const useLocalStorage = (key: string) => {
  const context = useContext(LocalStorageContext);

  if (!context) {
    throw new Error(
      'useLocalStorage must be used within a LocalStorageProvider',
    );
  }

  const { getValue, setValue } = context;
  const [value, setValueState] = useState<string | null>(
    getValue(key) || initialValue,
  );

  useEffect(() => {
    const { subscribe } = context;
    subscribe(key, setValueState);

    const existingValue = getValue(key);
    if (existingValue !== null) {
      setValue(key, existingValue);
    } else setValue(key, initialValue ?? '');

    return () => {
      subscribe(key, () => {}); // Clean up subscription on unmount
    };
  }, [key]);

  return [value, (newValue: string) => setValue(key, newValue)] as [
    string | null,
    (newValue: string) => void,
  ];
};

export default useLocalStorage;
