import {Control, useFieldArray, UseFormWatch} from "react-hook-form";
import {createSelectOptions} from "@/entities/PriceList/model/types.ts";
import {DeleteIcon, PlusIcon} from "@/shared/Icon";
import {FieldController} from '@/shared/ui/FieldController';
import {Button} from "@/shared/ui/Button";

import cls from './FieldsGetter.module.scss';
import {useMemo} from "react";
import {SelectOptions} from "@/app/types/types.ts";

interface FieldsGetterProps {
  usedHeaders: SelectOptions[]
  control: Control<any>;
}

export const FieldsGetter = (props: FieldsGetterProps) => {
  const {control, usedHeaders} = props;

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'headers',
  });

  const handleAddDomain = () => append(null);

  const removeDomains = (index: number) => remove(index);

  const selectOptions = createSelectOptions();

  const filteredHeaders = useMemo(() => {
    const selectedHeaders =
      usedHeaders?.map(domain => domain?.value).filter(Boolean);

    return selectOptions.filter(options => (!selectedHeaders?.includes(options.value)));
  }, [selectOptions, usedHeaders])

  return (
    <div className={cls.wrapper}>
      {fields.map((dealer, index) => (
        <div key={dealer.id} className={cls.field}>
          <span>{index + 1} </span>
          <FieldController.Select
            control={control}
            name={`headers.${index}`}
            options={filteredHeaders}
          />
          <div>
            <Button
              onClick={() => removeDomains(index)}
              Icon={DeleteIcon}
              theme='empty-accent'
            />
          </div>
        </div>
      ))}

      <div onClick={handleAddDomain} className={cls.buttons}>
        <Button theme='light-clear' Icon={PlusIcon}>Добавить поле</Button>
      </div>
    </div>
  )
}
