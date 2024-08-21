import {CSSProperties, FC} from 'react';

type PathsToStringProps<T> = T extends string | number | Date | boolean | [] ? [] : {
  [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>]
}[Extract<keyof T, string>];

type Join<T extends string[], D extends string> =
  T extends [] ? never :
    T extends [infer F] ? F :
      T extends [infer F, ...infer R] ?
        F extends string ?
          `${F}${D}${Join<Extract<R, string[]>, D>}` : never : string;

/**
 * Интерфейс поля ячейки таблицы
 */
export interface StructureConfig<T = object> {
  /**
   * Название ячейки в таблице
   */
  name: string;

  /**
   * Якорь-ссылка до поля в значении объекта
   * @example
   * data.foo.bar
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  dataAnchor?: Join<PathsToStringProps<T>, '.'>;

  /**
   * Название ключа для сортировки
   */
  sort?: string;

  /**
   * Кастомные стили для ячейки таблицы
   */
  cellCustomStyle?: CSSProperties;

  /**
   * Кастомные стили для шапки ячейки таблицы
   */
  cellTheadCustomStyle?: CSSProperties;

  cellTheadTextConfig?: any;

  component?: FC<{
    row: T
  }>

  valueDecorator?: (value: T) => string
}

export interface TableConfig<T = object> {
  cells: StructureConfig<T>[];
}

