const LOCALIZATION = 'LOCALIZATION';

/**
 * Sets the localization for the project
 * @param localization - localization
 */
export const setLocalization = (localization: string) => localStorage.setItem(LOCALIZATION, localization);
export const getLocalization = () => localStorage.getItem(LOCALIZATION);
export const getLocalizationOrDefault = () => {
  let localization = getLocalization();
  if (!localization) {
    localization = navigator.language;
    setLocalization(localization);
  }
  return localization;
};
