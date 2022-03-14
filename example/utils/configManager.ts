import getConfig from 'next/config';

export interface IAppConfigManager {
  readonly baseUrl?: string;
  readonly googleMapsApiKey?: string;
  readonly openCageApiKey?: string;
  readonly appInsightsInstrumentationKey?: string;
}

const BASE_URL =
  (getConfig().publicRuntimeConfig || {}).DSDNPOBACKEND_URL || 'https://shesha-mmsample-backend-dev.azurewebsites.net';

const devConfig: IAppConfigManager = {
  // CurrentTest
  baseUrl: BASE_URL,
  googleMapsApiKey: 'AIzaSyDqzmggfNgtg5YPfIzkoeFJnZoD5-x4KxY',
  openCageApiKey: '__key__',
  appInsightsInstrumentationKey: '__key__',
};

const CONFIG_KEY = '__APP_CONFIG__';

export default class ConfigManager {
  getConfig(): IAppConfigManager {
    try {
      // todo: review and remove, we have to do it just because shesha doesn't know about local config manager
      if (process.env.NODE_ENV !== 'production' && window) {
        window[CONFIG_KEY] = devConfig;
      }

      return process.env.NODE_ENV === 'production' ? window[CONFIG_KEY] : devConfig;
    } catch (error) {
      return devConfig;
    }
  }
}
