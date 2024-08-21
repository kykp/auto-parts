export const isValidJSON = (str: string) => {
  try {
    const obj = JSON.parse(str);

    return !!(obj && typeof obj === 'object');
  } catch (e) {
    return false;
  }
};
