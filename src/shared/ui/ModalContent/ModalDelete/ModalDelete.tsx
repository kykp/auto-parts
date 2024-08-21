import { ReactNode } from 'react';

import { lang } from '@/shared/consts/lang';
import { Button } from '@/shared/ui/Button';

import cls from './ModalDelete.module.scss';

interface ModalDeleteProps {
  cancel: () => void
  agree: () => void
  children: ReactNode
  isSubmitting: boolean
}

export const ModalDelete = (props: ModalDeleteProps) => {

  return (
    <div
      className={cls.ModalDelete}
    >
      <div>
        <h3>{lang.title.deleteConfirm}</h3>
      </div>
      <div>
        <p>
          {props.children}
        </p>
      </div>
      <div >
        <div >
          <div>
            <Button
              theme={'remove'}
              onClick={props.agree}
              disabled={props.isSubmitting}
            >
              {lang.btn.delete}
            </Button>
            <Button
              theme={'light'}
              onClick={props.cancel}
              disabled={props.isSubmitting}
            >
              {lang.btn.cancel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
