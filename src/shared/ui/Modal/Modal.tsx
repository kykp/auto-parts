import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect } from 'react';

import { XBtn } from '@/shared/ui/XBtn/XBtn';

import cls from './Modal.module.scss';


interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  isShowClose?: boolean;
  onClose: () => void;
  className?: string;
  style?: CSSProperties
}

const body = document.querySelector('body') as HTMLElement;

export const Modal = (props: ModalProps) => {

  const {
    children,
    isOpen,
    isShowClose,
    onClose,
    className,
    style,
  } = props;


  useEffect(() => {
    if (isOpen) {
      if (isOpen) body.style.overflow = 'hidden';
      else body.style.overflow = 'inherit';
    }

    return () => {
      body.style.overflow = 'inherit';
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(cls.modal, { [cls.show]: isOpen }, className || '')}
      onClick={onClose}
    >
      <div style={style} className={cls.container} onClick={e => e.stopPropagation()}>
        {isShowClose && (
          <XBtn className={cls.close} onClick={onClose} />
        )}
        {children}
      </div>
    </div>
  );
};
