import jseu from 'js-encoding-utils';

// Fields to remove from the AuthContext
interface IAccessToken {
  accessToken?: string | null;
  expireInSeconds?: number;
  expireOn?: string;
}

export const saveUserToken = ({ accessToken, expireInSeconds, expireOn }: IAccessToken, tokenName?: string) => {
  const token = {
    accessToken,
    expireInSeconds,
    expireOn,
  };

  const encodedToken = jseu.encoder.encodeBase64(JSON.stringify(token));

  localStorage.setItem(tokenName, encodedToken);

  return token;
};

export const getAccessToken = (tokenName: string): IAccessToken | null => {
  const token = localStorage.getItem(tokenName);

  if (token) {
    const deserializedToken = JSON.parse(jseu.encoder.decodeBase64(token) as string) as IAccessToken;

    if (hasTokenExpired(deserializedToken.expireOn || '')) {
      removeAccessToken(tokenName);

      return null;
    }
    return deserializedToken;
  }

  return null;
};

export const removeAccessToken = (tokenName: string) => {
  try {
    localStorage.removeItem(tokenName);
    localStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};

export const hasTokenExpired = (date: string): boolean => {
  return new Date(date) < new Date();
};
