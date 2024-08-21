import clsx from 'clsx';
import { TextareaHTMLAttributes, useId, useState } from 'react';

import { ValidationError } from '@/shared/ui/ValidationError';

import cls from './Area.module.scss';

type HTMLAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>

export type TextType = string | null;

export interface AreaProps extends HTMLAreaProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: TextType;
  error?: TextType;
  name?: string;
  hint?: TextType;
  autoComplete?: 'on' | 'off';
}

export const Area = (props: AreaProps) => {

  const {
    className,
    value,
    onChange,
    onBlur,
    onFocus,
    label = '',
    placeholder = '',
    disabled,
    error,
    hint,
    autoComplete,
  } = props;

  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);

  const onChangeHandler = (e: any) => {
    onChange?.(e.target.value);
  };

  const onBlurHandler = (e: any) => {
    setCurrentPlaceholder(placeholder);
    onBlur && onBlur(e);
  };

  const onFocusHandler = (e: any) => {
    setCurrentPlaceholder('');
    onFocus && onFocus(e);
  };

  const id = useId();

  return (
    <div className={clsx(cls.Container, className || '')}>
      <div>
        {label && (
          <label
            className={cls.Label}
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
      <div className={clsx(cls.TextAreaContainer, { [cls.TextAreaContainerError]: error })}>
        <textarea
          autoComplete={autoComplete}
          value={value ?? ''}
          placeholder={currentPlaceholder}
          disabled={disabled}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          id={id}
          className={clsx(cls.TextArea, { [cls.TextAreaError]: error })}
        />
        {error && (
          <ValidationError
            className={cls.validation}
            message={error}
          />
        )}
      </div>
      {hint && (
        <p
          className={cls.Hint}
        >
          {hint}
        </p>
      )}
      {error && (
        <span role={'validation-error'} className={'error'} />
      )}
    </div>
  );
};
