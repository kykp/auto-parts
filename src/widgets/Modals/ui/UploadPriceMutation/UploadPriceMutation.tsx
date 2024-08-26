import {useDispatch} from "react-redux";
import {closeModal, setAdditionalData} from "@/entities/Modals/model/slice/modalsSlice.ts";
import {Button} from "@/shared/ui/Button";
import {lang} from "@/shared/consts/lang.ts";
import {FieldController} from '@/shared/ui/FieldController'
import cls from './UploadPriceMutation.module.scss';
import {useForm} from "react-hook-form";
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {getModal} from "@/entities/Modals/model/selectors/selector.ts";
import {useEffect} from "react";

export const UploadPriceMutation = () => {
  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(closeModal())
  }
  const {control, handleSubmit, setValue} = useForm()

  const {additionalData} = useAppSelector(getModal);

  useEffect(() => {
    additionalData && setValue('myPrice', additionalData.myPrice);
  }, [additionalData]);

  const onHandleSubmit = (data) => {
    dispatch(setAdditionalData({additionalData: data}));
    onCancel();
  }

  return (
    <form className={cls.wrapper} onSubmit={handleSubmit(onHandleSubmit)}>

      <div className={cls.header}>
        <h2>Настройки текущего прайс листа</h2>
      </div>

      <div className={cls.body}>
        <div className={cls.fields}>
          <div className={cls.field}>
            <span>Ваша текущая наценка</span>
            <FieldController.Input
              control={control}
              name={'myPrice'}
              type='number'
              className={cls.input}
              placeholder={'Процент наценки'}
            />
            <span>%</span>
          </div>
        </div>
      </div>
      <div className={cls.buttons}>
        <Button
          theme='primary'
          type='submit'
        >
          {lang.btn.save}
        </Button>
        <Button
          theme={'remove'}
          onClick={onCancel}
        >
          {lang.btn.close}
        </Button>

      </div>
    </form>
  )
}
