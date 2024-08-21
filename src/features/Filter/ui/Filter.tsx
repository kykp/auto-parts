import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { lang } from '@/shared/consts/lang';
import { useEaseSearchParams } from '@/shared/hooks/useEaseSearchParams';
import { Button } from '@/shared/ui/Button';
import { FieldController } from '@/shared/ui/FieldController';
import { XBtn } from '@/shared/ui/XBtn/XBtn';

import { createDefaultValues } from '../config/defaultValues';
import { ConfigFilter, DefaultValues } from '../config/types';
import { checkEmptyValues } from '../lib/checkEmptyValaues/checkEmptyValues';

import cls from './Filter.module.scss';

interface FilterProps {
  isShowClose?: boolean;
  className?: string;
  onClose: () => void;
  config: ConfigFilter[];
}

const Filter = (props: FilterProps) => {
  const {
    isShowClose = true,
    className,
    onClose,
    config = [],
  } = props;

  const { control, handleSubmit, reset } = useForm<DefaultValues>({
    defaultValues: createDefaultValues(config),
  });

  const [_, setParams] = useEaseSearchParams();

  const onHandleSubmit = (data: DefaultValues) => {
    const filteredData = checkEmptyValues(data);

    const transformedData = Object.entries(filteredData).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'object' && value !== null ? value.value : value;
      return acc;
    }, {} as Record<string, string | number | boolean>);

    setParams((p: object) => ({ ...p, page: 1, ...transformedData }));
    onClose();
    reset();
  };

  const handleResetForm = async () => {
    setParams(() => ({ page: 1 }));
    onClose();
  };

  useEffect(() => {
    reset(createDefaultValues(config));
  }, [config]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .2 }}
        exit={{ opacity: 0 }}
        className={clsx(cls.FilterOverlay)}
        onClick={onClose}
      />
      <motion.form
        animate={{ transform: 'translateX(-320px)' }}
        exit={{ transform: 'translateX(0)' }}
        transition={{ duration: .3 }}
        className={clsx(cls.Filter, className)}
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <div className={cls.header} onClick={e => e.stopPropagation()}>
          <h2 className={cls.title}>{lang.title.filter}</h2>
          {isShowClose && (
            <XBtn onClick={onClose} />
          )}
        </div>
        <div className={cls.body}>
          {config.map((el, index) => (
            <div key={index}>
              {el.groupName && (
                <div
                  className={cls.label}
                >
                  {el.groupName}
                </div>
              )}
              {el.elementType === 'input' && (
                <FieldController.Input
                  control={control}
                  name={el.name}
                  placeholder={el.placeholder}
                  label={el.label}
                />
              )}
              {el.elementType === 'checkBox' && (
                <FieldController.Checkbox
                  control={control}
                  name={el.name}
                  label={el.label}
                />
              )}
              {el.elementType === 'select' && (
                <FieldController.Select
                  control={control}
                  name={el.name}
                  options={el.options}
                  placeholder={el.placeholder}
                  label={el.label}
                />
              )}
              {el.elementType === 'switcher' && (
                <FieldController.Switch
                  control={control}
                  name={el.name}
                  label={el.label}
                />
              )}

              {el.elementType === 'date' && (
                <div className={cls.field}>
                  <span>{el.label}</span>

                  <div key={index} className={cls.container}>
                    {el.fields.map((item, index) => (
                      <FieldController.Input
                        key={index}
                        control={control}
                        type='date'
                        name={item.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {el.elementType === 'time' && (
                <div className={cls.field}>
                  <span>
                    {el.label}
                  </span>
                  <div key={index} className={cls.container}>
                    {el.fields.map((item, index) => (
                      <FieldController.Input
                        key={index}
                        control={control}
                        type='time'
                        name={item.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={cls.buttons}>
          <Button type='submit'>{lang.btn.acceptFilters}</Button>
          <Button type='button' theme='white' onClick={handleResetForm}>{lang.btn.clearFilters}</Button>
        </div>
      </motion.form>
    </>
  );
};

export default Filter;
