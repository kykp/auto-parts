import {ReactNode} from 'react';

import {lang} from '@/shared/consts/lang';
import {Button} from '@/shared/ui/Button';

import cls from './ModalDelete.module.scss';

interface ModalDeleteProps {
  cancel: () => void
  agree: () => void
  children: ReactNode
  isDisabled?: boolean;
}

export const ModalDelete = (props: ModalDeleteProps) => {

  return (
    <div className={cls.ModalDelete}>
      <div className={cls.header}>
        <h3 className={cls.header_title}>{lang.title.deleteConfirm}</h3>
      </div>

      <div className={cls.body}>
          {props.children}
      </div>

      <div className={cls.buttons}>
        <Button
          theme={'remove'}
          onClick={props.agree}
          disabled={props.isDisabled}
        >
          {lang.btn.delete}
        </Button>
        <Button
          theme={'light'}
          onClick={props.cancel}
        >
          {lang.btn.cancel}
        </Button>
      </div>
    </div>
  );
};
