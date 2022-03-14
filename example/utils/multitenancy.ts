const TENANT_KEY = 'TENANT';

/**
 * Sets the tenant id
 * @param tenantId - the tenant id
 */
export const setTenantId = function(tenantId: string) {
  if (tenantId) {
    localStorage.setItem(TENANT_KEY, tenantId);
  } else {
    localStorage.removeItem(TENANT_KEY);
  }
};

/**
 * Gets the tenant id
 * @returns tenantId
 */
export const getTenantId = function() {
  const value = localStorage.getItem(TENANT_KEY);
  if (!value) {
    return null;
  }

  return parseInt(value);
};
