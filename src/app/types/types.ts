export type Options = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
}
export type SortType = { sort?: string }

export type SelectOptions<T = string | number | boolean> = {
  value: T;
  label: string;
};
