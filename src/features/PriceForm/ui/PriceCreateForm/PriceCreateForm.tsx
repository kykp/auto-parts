import {Content} from "@/shared/ui/Content";
import {useForm} from "react-hook-form";
import {resolver} from "../../config/resolver.ts";
import {useNavigate} from "react-router-dom";
import {FormValues} from "../../types/types.ts";
import {lang} from "@/shared/consts/lang.ts";
import {PlusIcon, SaveIcon} from "@/shared/Icon";
import {Section} from "@/shared/ui/Section";
import {Button} from "@/shared/ui/Button";
import {FieldController} from "@/shared/ui/FieldController";
import cls from './PriceCreateForm.module.scss';
import {usePriceList} from "@/entities/PriceList/hooks/usePriceList/usePriceList.ts";
import {routePaths} from "@/app/providers/router";
import {PriceSchema} from "@/entities/PriceList/model/types.ts";
import {parseDataToForm} from "../../config/parseDataToForm.ts"

interface PriceCreateForm {
  id?: string;
  initialValues: PriceSchema | null;
}

export const PriceCreateForm = (props: PriceCreateForm) => {
  const {
    initialValues,
    id,
  } = props;

  const {control, handleSubmit,} = useForm<FormValues>({defaultValues: parseDataToForm(initialValues), resolver});

  const navigate = useNavigate();

  const {createElement} = usePriceList();

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await createElement(values);

      response && navigate(routePaths.prices);
    } catch (e) {
      console.log('Ошибка авторизации', e)
    }
  }
  return (
    <Content>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cls.wrapper}>
          <Section.Header>
            <Section.Title title={id ? lang.title.editPriceItem : lang.title.creatNewPriceItem} isBack/>
          </Section.Header>
          <Section isSeparator title={lang.title.priceElement}>
            <div className={cls.body}>
              <FieldController.Input
                control={control}
                name='article'
                label={lang.label.article}
              />
              <FieldController.Input
                control={control}
                name='name'
                label={lang.label.name}
              />
              <FieldController.Input
                control={control}
                name='brand'
                label={lang.label.brand}
              />
              <FieldController.Input
                control={control}
                name='delivery_time'
                label={lang.label.deliveryTime}
              />
              <FieldController.Input
                control={control}
                name='min_order_qty'
                label={lang.label.minOrderQty}
              />
              <FieldController.Input
                control={control}
                name='quantity'
                label={lang.label.quantity}
              />
              <FieldController.Input
                control={control}
                name='supplier'
                label={lang.label.supplier}
              />
              <FieldController.Input
                control={control}
                name='purchase_price'
                label={lang.label.purchasePrice}
              />
              <FieldController.Input
                control={control}
                name='price'
                label={lang.label.price}
              />
            </div>
          </Section>
          <Section.Footer>
            <div className={cls.buttons}>
              <Button theme='white'>{lang.btn.cancel}</Button>
              <Button
                type='submit'
                Icon={id ? SaveIcon : PlusIcon}>
                {id ? lang.btn.save : lang.btn.create}
              </Button>
            </div>
          </Section.Footer>
        </div>
      </form>
    </Content>
  )
}
