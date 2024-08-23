import clsx from 'clsx';

import {XBtn} from '@/shared/ui/XBtn/XBtn';

import cls from './Modal.module.scss';

import {useDispatch} from 'react-redux';
import {closeModal} from "@/entities/Modals/model/slice/modalsSlice.ts"
import {getModal} from "@/entities/Modals/model/selectors/selector.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {modalsComponentsMap} from "@/features/Modals/types/types.ts";

export const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useAppSelector(getModal);

  if (!isOpen || !modalType) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const ComponentToRender = modalType ? modalsComponentsMap[modalType] : null;

  if (!ComponentToRender) return null;

  return (
    <div
      className={clsx(cls.modal, {[cls.show]: isOpen})}
      onClick={handleClose}
    >
      <div className={cls.container} onClick={e => e.stopPropagation()}>
        <XBtn className={cls.close} onClick={handleClose}/>
        <ComponentToRender {...modalProps} />
      </div>
    </div>
  );
};
