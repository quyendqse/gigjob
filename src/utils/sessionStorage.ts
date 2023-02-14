/**
 * Save a key/value pair to session storage
 * @param key name of object to save in session storage
 * @param value object to be saved in session storage
 */
const saveToSession = (key: string, value: any) => {
  window.sessionStorage.setItem(key, value);
};

/**
 * Get value from session storage;
 * @param key to get value in session storage
 * @returns value get from key in session storage
 */

const getValueInSession = (key: string): string | null => {
  if (window.sessionStorage.getItem(key)) {
    return window.sessionStorage.getItem(key);
  }
  return null;
};

/**
 * Remove key/value pair in session storage
 * @param key match with value to remove
 */
const deleteInSession = (key: string) => {
  window.sessionStorage.removeItem(key);
};

const clearSession = () => window.sessionStorage.clear();

export { saveToSession, getValueInSession, deleteInSession, clearSession };
