const getStorage = () => (typeof window === 'undefined' ? null : window.localStorage);

export function readStoredList(key) {
  try {
    const value = JSON.parse(getStorage()?.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error(`Unable to read ${key}.`, error);
    return [];
  }
}

export function writeStoredList(key, value) {
  try {
    getStorage()?.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Unable to write ${key}.`, error);
    return false;
  }
}

export function readStoredMap(key) {
  try {
    const value = JSON.parse(getStorage()?.getItem(key) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch (error) {
    console.error(`Unable to read ${key}.`, error);
    return {};
  }
}

export function writeStoredMap(key, value) {
  try {
    getStorage()?.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Unable to write ${key}.`, error);
    return false;
  }
}
