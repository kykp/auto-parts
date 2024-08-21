import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { ConfigFilter, Filter } from '@/features/Filter';

import { lang } from '@/shared/consts/lang';
import { Button } from '@/shared/ui/Button';
import { FilterIcon } from '@/shared/Icon';

interface TableFilterProps {
  className?: string;
  isShowClose?: boolean;
  config: ConfigFilter[];
}

export const TableFilter = (props: TableFilterProps) => {
  const { className, config, isShowClose } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onToggleOpenFilter = () => setIsOpen(prevState => !prevState);

  return (
    <>
      <Button
        Icon={FilterIcon}
        theme='light'
        onClick={onToggleOpenFilter}
      >
        {lang.text.filter}
      </Button>
      <AnimatePresence initial>
        {isOpen && (
          <Filter
            config={config}
            onClose={onToggleOpenFilter}
            isShowClose={isShowClose}
            className={className}
          />
        )}
      </AnimatePresence>
    </>
  );
};
