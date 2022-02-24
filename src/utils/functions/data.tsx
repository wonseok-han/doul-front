/**
 * NOTE: 값 null, undefined, '' 체크
 * @param value 체크할 값
 * @returns null || undefined || '' => true, !null && !undefined && !'' => false,
 */
export const isNull = (
  value: Array<any> | unknown | string | number | Date | null | undefined
): boolean => {
  if (value instanceof Array) return value.length === 0;
  else if (value instanceof Object) return Object.keys(value).length === 0;
  else return value === null || value === undefined || value === "";
};
