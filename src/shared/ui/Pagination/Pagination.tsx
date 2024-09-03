import Skeleton from 'react-loading-skeleton';

import { getPaginationStack } from '@/shared/lib/getPaginationStack';
import { Button } from '@/shared/ui/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/Icon';
import cls from './Pagination.module.scss';

interface PaginationProps {
  total?: number
  page?: string,
  perPage?: string,
  setPage: (page: string) => void,
  isLoading: boolean,
}

const stackSize = 4;

export const Pagination = (props: PaginationProps) => {

  const {
    total,
    page,
    setPage,
    perPage,
    isLoading,
  } = props;

  if (!page || !perPage) {
    return null;
  }

  if (total === undefined && isLoading) {
    return (
      <div>
        <Skeleton width={40} height={40} />
        <Skeleton width={40} height={40} />
        <Skeleton width={40} height={40} />
        <Skeleton width={40} height={40} />
        <Skeleton width={40} height={40} />
        <Skeleton width={40} height={40} />
        <Skeleton width={40} height={40} />
        <Skeleton width={40} height={40} />
      </div>
    );
  }

  if (total === undefined || total === 0 && !isLoading) {
    return <div />;
  }

  const pages = Math.ceil(total / parseInt(perPage));

  const handler = (cb: () => void) => isLoading ? () => {} : () => cb();

  return (
    <div className={cls.wrapper}>
      <Button
        mode={'box'}
        theme={'clear'}
        Icon={ArrowLeftIcon}
        disabled={parseInt(page) <= 1 || isLoading}
        onClick={handler(() => setPage(`${parseInt(page) - 1}`))}
      />

      {getPaginationStack(pages, stackSize, page).map((el, i) => (
        <Button
          key={`${el}-${i}`}
          mode={'box'}
          disabled={el === '...' || isLoading}
          theme={el === page ? 'primary' : 'white'}
          onClick={handler(() => setPage(`${el}`))}
        >
          {el}
        </Button>
      ))}

      <Button
        mode={'box'}
        theme={'clear'}
        Icon={ArrowRightIcon}
        disabled={parseInt(page) >= pages || isLoading}
        onClick={handler(() => setPage(`${parseInt(page) + 1}`))}
      />
    </div>
  );
};
