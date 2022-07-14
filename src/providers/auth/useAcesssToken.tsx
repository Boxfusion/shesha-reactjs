import { useState, useEffect } from 'react';
import { useCrossTabState } from '../../hooks';
import { removeAccessToken, saveUserToken, getAccessToken, getHttpHeaders, IAccessToken } from '../../utils/auth';

interface IAccessTokenHelper {
  token?: IAccessToken;
  saveUserToken?: any;
  getHttpHeaders?: any;
}

export function usePersistedAccessToken(tokenName: string) {
  // const [state, setState] = useState<IAccessToken>();
  const state = useCrossTabState(tokenName || 'tokenName', null, false);

  // useEffect(() => {
  //   setState(getAccessToken(tokenName));
  // }, [token]);

  console.log('usePersistedAccessToken state', state);

  return state;
}
