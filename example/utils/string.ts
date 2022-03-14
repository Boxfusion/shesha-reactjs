export const capitalizeFirstLetter = (str: string) => {
  if (!str) return null;

  return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
};
