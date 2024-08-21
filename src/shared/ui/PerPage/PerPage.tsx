import clsx from 'clsx';

import { _perPageList } from '@/app/types/config';

import { lang } from '@/shared/consts/lang';
import { PerPageItem } from '@/shared/ui/PerPage/PerPageItem';

interface PerPageProps {
  className?: string
  perPage?: string
  list?: string[]
  setPerPage: (perPage: number) => void
}

export const PerPage = (props: PerPageProps) => {

  const {
    className,
    perPage,
    list = _perPageList,
    setPerPage,
  } = props;

  if (!perPage) {
    return null;
  }

  return (
    <div className={clsx(className || '')}>
      <span>{lang.text.perPage}</span>
      {list.map(el => (
        <PerPageItem
          key={el}
          num={parseInt(el)}
          setPerPage={setPerPage}
          isActive={perPage === el}
        />
      ))}
    </div>
  );
};
