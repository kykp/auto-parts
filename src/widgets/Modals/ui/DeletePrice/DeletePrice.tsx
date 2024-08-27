import {useDispatch} from "react-redux";
import {usePriceList} from "@/entities/PriceList/hooks/usePriceList/usePriceList.ts";
import {useRefetch} from "@/shared/hooks/useRefetch";
import {closeModal} from "@/entities/Modals/model/slice/modalsSlice.ts";
import {ModalDelete} from "@/shared/ui/ModalContent";
import {lang} from "@/shared/consts/lang.ts";
import {useEffect, useState} from "react";
import cls from './DeletePrice.module.scss';

export const DeletePrice = () => {
  const [count, setCount] = useState(5);

  const dispatch = useDispatch();

  const {deletePrice} = usePriceList();
  const {startRefetch} = useRefetch();

  const onCancel = () => {
    dispatch(closeModal())
  }

  const onDelete = async () => {
    try {
      await deletePrice();
      startRefetch();
      onCancel();
    } catch (e) {
      console.log('При удалении прайслиста возникла ошибка', e)
    }
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount(prevState => {
        if (prevState <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevState - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <ModalDelete cancel={onCancel} agree={onDelete} isDisabled={!!count}>
      <div className={cls.wrapper}>
        <span>{lang.text.acceptDeleteFullPrice}</span>
        <h2>{count}</h2>
      </div>
    </ModalDelete>
  )
}
