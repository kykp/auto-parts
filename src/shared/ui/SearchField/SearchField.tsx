import { ReactNode } from 'react';

import { lang } from '@/shared/consts/lang';
import { SearchIcon } from '@/shared/Icon';

import cls from './SearchField.module.scss';

interface SearchFieldProps {
  searchValue: string
  setSearchValue: (val: string) => void
  children?: ReactNode
}

export const SearchField = (props: SearchFieldProps) => {

  return (
    <div className={cls.SearchContainer}>
      <div className={cls.SearchIcon}>
        <SearchIcon
          width={20}
          height={20}
        />
      </div>
      <input
        type='text'
        placeholder={lang.text.search}
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value)}
      />
      {props.children}
    </div>
  );
};
