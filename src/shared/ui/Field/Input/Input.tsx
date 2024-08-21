import clsx from 'clsx';
import {ChangeEvent, InputHTMLAttributes, useId, useState} from 'react';

import {EyeCloseIcon, EyeOpenIcon} from '@/shared/Icon';
import {ValidationError} from '@/shared/ui/ValidationError';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

export type TextType = string | null;

export interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  mask?: string;
  label?: TextType;
  error?: TextType;
  name?: string;
  hint?: TextType;
  alwaysShowMask?: boolean;
  autoComplete?: 'on' | 'off';
}

export const Input = (props: InputProps) => {

  const {
    className,
    value,
    onChange,
    onBlur,
    onFocus,
    type = 'text',
    // mask = '',
    label = '',
    placeholder = '',
    disabled,
    inputMode,
    error,
    hint,
    autoComplete,
    // alwaysShowMask,
  } = props;

  const [inputType, setInputType] = useState(type);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);

  const isShowEye = type === 'password';
  const isClosedEye = inputType === 'password';

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

  const toggleType = () => {
    setInputType(type => type === 'password' ? 'text' : 'password');
  };

  const id = useId();

  return (
    <div className={clsx(cls.Container, className || '')}>
      {label && (<label htmlFor={id}>{label}</label>)}
      <div className={clsx(cls.InputContainer, {[cls.InputContainerError]: error})}>
        <input
          autoComplete={autoComplete}
          type={inputType}
          inputMode={inputMode}
          value={value ?? ''}
          placeholder={currentPlaceholder}
          disabled={disabled}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          id={id}
          className={clsx(cls.Input, {[cls.InputError]: error, [cls.withIcon]: isShowEye})}
        />
        {isShowEye && (
          <button className={cls.toggleTypeBtn} type={'button'} onClick={toggleType}>
            {isClosedEye ? (
              <EyeCloseIcon/>
            ) : (
              <EyeOpenIcon/>
            )}
          </button>
        )}
        {error && (
          <ValidationError
            data-testid={`error-${props.name}`}
            className={cls.validation}
            message={error}
          />
        )}
      </div>
      {hint && (
        <p className={cls.Hint}>
          {hint}
        </p>
      )}
      {error && (
        <span role={'validation-error'} className={'error'}/>
      )}
    </div>
  );
};
