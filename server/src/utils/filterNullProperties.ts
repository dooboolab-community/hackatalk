/**
 * Create a new JavaScript object with all null properties replaced to undefined.
 * @param obj target object.
 */
export function filterNullProperties<T>(
  obj: T,
): { [P in keyof T]: Exclude<T[P], null> } {
  return Object.assign(
    {},
    ...Object.getOwnPropertyNames(obj).map((name) => ({
      [name]: obj[name] === null ? undefined : obj[name],
    })),
  );
}
