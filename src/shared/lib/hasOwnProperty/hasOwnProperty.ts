export function hasOwnProperty<T, K extends keyof T>(obj: T, prop: K): obj is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
