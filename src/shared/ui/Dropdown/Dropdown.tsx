import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  useClick,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactElement, useState } from 'react';

import { DotsIcon } from '@/shared/Icon';

import cls from './Dropdown.module.scss';

interface ContextMenu {
  Icon?: ReactElement;
  title: string;
  cb: () => void;
  isReadOnly?: boolean;
}

export interface DropdownProps {
  list: ContextMenu[]
  children?: (props: { isOpen: boolean }) => ReactElement,
  className?: string
  listFontSettings?: {
    weight?: 'regular' | 'bold',
    transform?: 'uppercase',
    size?: 'xs',
    customFontSize?: number
  }
}

export const Dropdown = (props: DropdownProps) => {

  const {
    list,
    children,
    className,
    listFontSettings = {
    },
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const callFn = (event: React.MouseEvent<HTMLLIElement, MouseEvent> , cb: () => void) => {
    event.stopPropagation();
    toggle();
    cb();
  };

  const middleware = [offset(4)];

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-end', // : 'bottom-end',
    middleware,
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
  ]);

  return (
    <div className={clsx(cls.Dropdown, className || '')}>

      <button
        onClick={toggle}
        onContextMenu={toggle}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children ?
          children({ isOpen }) : (
            <div className={clsx(cls.button, { [cls.opened]: isOpen })}>
              <DotsIcon height={20} width={20} />
            </div>
          )}
      </button>

      {isOpen && (
        <FloatingPortal id={'dropdown'}>
          <FloatingFocusManager context={context} modal={false}>
            <motion.div
              className={cls.contextMenu}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: .2 }}
            >
              <ul className={cls.list}>
                {list.map(({ title, Icon, cb, isReadOnly }, i) => (
                  <li
                    className={clsx(cls.item, { [cls.itemReadOnly]: isReadOnly })}
                    key={i}
                    onClick={(event) => {
                      !isReadOnly && callFn(event, cb);
                    }}
                  >
                    {Icon && <div className={cls.itemIcon}>{Icon}</div>}
                    <span className={cls.title}{...listFontSettings}>
                      {title}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
};
