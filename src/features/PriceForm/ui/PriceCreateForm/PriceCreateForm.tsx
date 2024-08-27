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
import {formFields} from "@/features/PriceForm/config/formFields.ts";

interface PriceCreateForm {
  id?: number;
  initialValues: PriceSchema | null;
}

export const PriceCreateForm = (props: PriceCreateForm) => {
  const {
    initialValues,
    id,
  } = props;

  const {control, handleSubmit,} = useForm<FormValues>({defaultValues: parseDataToForm(initialValues), resolver});

  const navigate = useNavigate();

  const {createElement, updateElement} = usePriceList();

  const onSubmit = async (values: FormValues) => {
    try {
      const response = id
        ? await updateElement(values, id)
        : await createElement(values);

      if (response) navigate(routePaths.prices);
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
              {formFields.map(({name, label}) => (
                <FieldController.Input key={name} control={control} name={name} label={label}/>
              ))}
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
