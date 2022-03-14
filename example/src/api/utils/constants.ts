import ConfigManager from 'utils/configManager';

export const APP_BASE_URL = new ConfigManager().getConfig().baseUrl;

export const BASE_URL = APP_BASE_URL;
