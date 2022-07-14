import { useEffect } from 'react';

export const useLocalStorageSynchedState = (
  key: string,
  callback: (event: StorageEvent) => void,
  deps?: ReadonlyArray<any>
) => {
  const onLocalStorageChange = (event: StorageEvent) => {
    if (key && event?.key === key) {
      callback(event);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', onLocalStorageChange);
    return () => {
      window.removeEventListener('storage', onLocalStorageChange);
    };
  }, [deps]);
};
