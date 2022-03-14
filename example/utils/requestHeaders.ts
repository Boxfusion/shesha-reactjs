import { getAccessToken } from './auth';
import { getLocalizationOrDefault } from './localization';
import { getTenantId } from './multitenancy';

/**
 * Retrieves the request headers for the application
 */
export const requestHeaders = (): { [key: string]: string } => {
  const headers: { [key: string]: string } = {};

  const token = getAccessToken && getAccessToken() && getAccessToken().accessToken;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  headers['.AspNetCore.Culture'] = getLocalizationOrDefault();

  const tenantId = getTenantId();

  if (tenantId) {
    headers['Abp.TenantId'] = getTenantId().toString();
  }

  return headers;
};
