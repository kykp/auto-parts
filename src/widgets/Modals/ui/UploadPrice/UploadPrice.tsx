import {useDispatch} from "react-redux";
import {closeModal} from "@/entities/Modals/model/slice/modalsSlice.ts";
import cls from './Upload.module.scss';
import {Button} from "@/shared/ui/Button";
import {lang} from "@/shared/consts/lang.ts";
import {Alert} from "@/shared/ui/Alert";

export const UploadPrice = (props) => {
  const {message, type} = props;

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(closeModal())
  }

  return (

    <div className={cls.wrapper}>
      <div className={cls.body}>
        <Alert type={type}>
          {message}
        </Alert>
      </div>
      <div className={cls.buttons}>
        <Button
          theme={type === 'error' ? 'remove': 'primary'}
          onClick={onCancel}
        >
          {lang.btn.close}
        </Button>
      </div>
    </div>
  )
}
