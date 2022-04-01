/**
 * NOTE: Local Storage에 값 셋팅하는 함수
 * @param key 셋팅할 키
 * @param value 셋팅할 값
 */
export const setLocalStorage = (key: string, value: string): void => {
  window.localStorage.setItem(key, value);
};

/**
 * NOTE: Local Storage에서 Key Parameter에 해당하는 값을 얻어오는 함수
 * @param key
 * @returns
 */
export const getLocalStorage = (key: string): string | null | undefined => {
  return window.localStorage.getItem(key);
};

/**
 * NOTE: Session Storage에 값 셋팅하는 함수
 * @param key 셋팅할 키
 * @param value 셋팅할 값
 */
export const setSessionStorage = (key: string, value: string): void => {
  window.sessionStorage.setItem(key, value);
};

/**
 * NOTE: Session Storage에서 Key Parameter에 해당하는 값을 얻어오는 함수
 * @param key
 * @returns
 */
export const getSessionStorage = (key: string): string | null | undefined => {
  return window.sessionStorage.getItem(key);
};

/**
 * NOTE: Session Storage에서 Key Parameter에 해당하는 항목을 제거하는 함수
 * @param key
 * @returns
 */
export const removeSessionStorage = (key: string): void => {
  window.sessionStorage.removeItem(key);
};
