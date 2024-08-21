import { ElementType } from 'react';

export interface RouteSchema {
  /**
   * Путь в адресной строке
   */
  path?: string
  defaultParams?: string
  Component?: ElementType
  name?: string
  Icon?: any;
  inMenu?: boolean
  parent?: string
}
