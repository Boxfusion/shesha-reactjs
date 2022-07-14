import { useState, useRef, useEffect } from 'react';

export const useCrossTabState = (stateKey: string, defaultValue?: any, readOnly?: boolean) => {
  const [state, setState] = useState(500);
  // const isNewSession = useRef(true);

  // useEffect(() => {
  //   if (isNewSession?.current) {
  //     const currentState = localStorage.getItem(stateKey);
  //     if (currentState) {
  //       setState(JSON.parse(currentState));
  //     } else {
  //       setState(defaultValue);
  //     }
  //     isNewSession.current = false;
  //     return;
  //   }
  //   try {
  //     if (!readOnly) {
  //       localStorage.setItem(stateKey, JSON.stringify(state));
  //     }
  //   } catch (error) {}
  // }, [state, stateKey, defaultValue]);

  // useEffect(() => {
  //   const onReceiveMessage = e => {
  //     const { key, newValue } = e;
  //     if (key === stateKey) {
  //       setState(JSON.parse(newValue));
  //     }
  //   };
  //   window.addEventListener('storage', onReceiveMessage);
  //   return () => window.removeEventListener('storage', onReceiveMessage);
  // }, [stateKey, setState]);

  return [state, setState];
};
