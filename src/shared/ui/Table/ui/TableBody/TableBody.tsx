import clsx from 'clsx';

import { lang } from '@/shared/consts/lang';
import { saveGetByPath } from '@/shared/lib/saveGetByPath';

import type { StructureConfig } from '../../types/types';

import cls from './TableBody.module.scss';

interface TableBodyCellProps<Data> {
  row: Data
  cellField: StructureConfig<Data>
}

const TableBodyCell = <Data,>(props: TableBodyCellProps<Data>) => {

  const {
    row,
    cellField,
  } = props;

  let targetValue;

  if (cellField.dataAnchor) {
    targetValue = saveGetByPath(row, cellField.dataAnchor, '');
  } else {
    targetValue = row;
  }

  const Component = cellField.component;

  const valueWithDecorator: string = cellField.valueDecorator
    ? cellField.valueDecorator(targetValue)
    : targetValue;

  return (
    <td className={cls.td} style={cellField.cellCustomStyle}>
      {Component ? (
        <Component {...{ value: valueWithDecorator, row }} />
      ) : (
        <div>{typeof valueWithDecorator === 'string' ? valueWithDecorator : ''}</div>
      )}
    </td>
  );
};

interface TableBodyRow<Data> {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  structureConfig: StructureConfig<Data>[]
  row: Data,
  className?: string
}

const TableBodyRow = <Data,>(props: TableBodyRow<Data>) => {

  const {
    className,
    structureConfig,
    row,
  } = props;

  return (
    <tr className={clsx(cls.tr, className)}>
      {structureConfig.map((el, cellId) => (
        <TableBodyCell
          key={`${cellId}`}
          cellField={el}
          row={row}
        />
      ))}
    </tr>
  );
};

interface TableBodyProps<Data> {
  items: Data[],
  structureConfig: StructureConfig<Data>[]
  isLoading?: boolean
}

export const TableBody = <Data extends { id: string | number },>(props: TableBodyProps<Data>) => {

  const {
    items,
    structureConfig,
    isLoading,
  } = props;

  return (
    <tbody>
      {
        items?.map((row) => (
          <TableBodyRow structureConfig={structureConfig} row={row} key={row.id} />
        ))
      }
      {items?.length === 0 && !isLoading && (
        <tr className={clsx(cls.tr, cls.trMessage)}>
          <td className={cls.td} colSpan={structureConfig.length}>
            <span>{lang.text.dataNotFound}</span>
          </td>
        </tr>
      )}
    </tbody>
  );
};
