export const extractDomain = (url: string): string => {
  try {
    const domain = new URL(url).hostname.toLowerCase();
    const parts = domain.split('.');

    const filteredParts = parts.filter(part => part !== 'www' && part !== 'ru' && part !== 'com');

    console.log('filteredParts', filteredParts.join('.'));
    return filteredParts.join('.');
  } catch (e) {
    return url;
  }
};