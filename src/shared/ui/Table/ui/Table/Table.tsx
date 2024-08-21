import clsx from 'clsx';

import {TableConfig} from '../../types/types';
import {TableBody} from '../TableBody/TableBody';
import {TableHead} from '../TableHead/TableHead';

import cls from './Table.module.scss';

export type List<T> = T[];

interface TableProps<Data> {
  data: List<Data>
  tableConfig: TableConfig<Data>
  isLoading?: boolean
}

export const Table = <Data extends { id: string | number }, >(props: TableProps<Data>) => {

  const {data, tableConfig, isLoading} = props;

  return (
    <table className={clsx(cls.Table, {[cls.TableLoading]: isLoading})}>
      <TableHead<Data>
        structureConfig={tableConfig.cells}
      />
      <TableBody<Data>
        items={data}
        structureConfig={tableConfig.cells}
        isLoading={isLoading}
      />
    </table>
  );
};
