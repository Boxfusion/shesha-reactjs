import { useState } from 'react';

export function useWebStorage<T>(
  storage: 'localStorage' | 'sessionStorage',
  key: string,
  initialValue: T
): [T, (v: T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    let item: any;
    try {
      // Get from local storage by key
      item = window[storage].getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      return item;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to 'localStorage' | 'sessionStorage'.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window[storage].setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}