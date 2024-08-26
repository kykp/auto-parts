import {useDispatch} from "react-redux";
import {closeModal} from "@/entities/Modals/model/slice/modalsSlice.ts";
import cls from './Upload.module.scss';
import {Button} from "@/shared/ui/Button";
import {lang} from "@/shared/consts/lang.ts";

export const UploadPrice = (props) => {
  const {message} = props;

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(closeModal())
  }

  return (
    <div className={cls.wrapper}>

      <h2>{message}</h2>

      <div className={cls.buttons}>
        <Button
          theme={'remove'}
          onClick={onCancel}
        >
          {lang.btn.close}
        </Button>

      </div>
    </div>
  )
}
