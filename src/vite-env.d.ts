/// <reference types="vite/client" />
type SelectOption<Value = string | number | boolean, ExtraArgs extends object = object> = ExtraArgs & {
  value: Value,
  label: string,

  isInactive?: boolean,

  disabled?: boolean

  [key: string | number]: unknown
}
