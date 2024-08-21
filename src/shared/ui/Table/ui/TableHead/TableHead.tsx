import clsx from 'clsx';

import { SortType } from '@/app/types/types';

import { useEaseSearchParams } from '@/shared/hooks/useEaseSearchParams';
// import { FlatArrowDownIcon } from '@/shared/ui/Icon';

import { StructureConfig } from '../../types/types';

import cls from './TableHead.module.scss';


interface TableHeadCellProps<T> {
  element: StructureConfig<T>;
  sortHandler: (field?: string) => void;
  direction?: 'down' | 'up';
  sort?: string;
}


const TableHeadCell = <T, >(props: TableHeadCellProps<T>) => {

  const {
    element,
    sortHandler,
    direction,
    sort,
  } = props;

  // const [isHover, setIsHover] = useState(false);

  const isActiveBySort = sort === element.sort || sort === `-${element.sort}`;

  // const isActive = (isActiveBySort || isHover);


  const cellName = element.name || '';
  return (
    <th className={cls.th} style={element.cellTheadCustomStyle}>
      {element.sort ? (
        <div
          className={clsx(cls.sort, {
            [cls.isRevert]: isActiveBySort && direction === 'down',
          })}
          onClick={() => sortHandler(element.sort)}
          // onMouseEnter={() => setIsHover(true)}
          // onMouseLeave={() => setIsHover(false)}
        >
          <span >{cellName}</span>
          {/*<FlatArrowDownIcon*/}
          {/*  color={isActive ? cssColors.clrText : cssColors.clrTextGray}*/}
          {/*  width={18}*/}
          {/*  height={18}*/}
          {/*  className={cls.arrow}*/}
          {/*/>*/}
        </div>
      ) : (
        <span>{cellName}</span>
      )}
    </th>
  );
};


interface TableHeadProps<T> {
  structureConfig: StructureConfig<T>[];
}


export const TableHead = <T, >(props: TableHeadProps<T>) => {
  const {
    structureConfig,
  } = props;

  const [{ sort }, setParams] = useEaseSearchParams<SortType>();

  const sortHandler = (field: string | undefined) => {
    if (sort === undefined || field !== sort) {
      setParams((p: object) => ({ ...p, sort: field }));
    }

    if (sort === field) {
      setParams((p: object) => ({ ...p, sort: `-${field}` }));
    }

    if (sort === `-${field}`) {
      setParams((p: object) => ({ ...p, sort: '' }));
    }
  };

  return (
    <thead className={cls.TableHead}>
      <tr className={cls.tr}>
        {
          structureConfig.map((element, i) => (
            <TableHeadCell
              element={element}
              key={i}
              sortHandler={sortHandler}
              direction={sort?.includes('-') ? 'up' : 'down'}
              sort={sort}
            />
          ))
        }
      </tr>
    </thead>
  );
}
;
