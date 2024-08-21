import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import {ChangeEvent, useEffect, useId, useState} from 'react';
import {useInView} from 'react-intersection-observer';

import {lang} from '@/shared/consts/lang';
import {ArrowFlatDownIcon, SearchIcon} from '@/shared/Icon';

import {OptionItem} from '../OptionItem/OptionItem';

import cls from './Select.module.scss';

export interface SelectProps<Option> {
  className?: string
  label?: string
  hint?: string
  disabled?: boolean
  error?: string
  placeholder?: string
  isSearchable?: boolean
  options: Option[]
  value: Option | null
  onChange: (val: Option) => void
  paginate?: (searchVal?: string) => void
  loading?: boolean
}

export const Select = <Option extends SelectOption, >(props: SelectProps<Option>) => {
  const {
    label,
    className,
    hint,
    disabled,
    error,
    placeholder = lang.text.selectFromList,
    isSearchable = true,
    options,
    value,
    onChange,
    paginate,
    loading,
  } = props;

  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const {ref: lastOptionRef, inView} = useInView({
    threshold: 0,
  });

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      size({
        apply({rects, elements, availableHeight}) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            maxWidth: `${rects.reference.width}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const click = useClick(context, {event: 'mousedown', enabled: !disabled, keyboardHandlers: false});
  const dismiss = useDismiss(context, {enabled: !disabled});

  const {
    getReferenceProps,
    getFloatingProps,
  } = useInteractions([
    click,
    dismiss,
  ]);

  const onChangeHandler = (option: Option) => {
    onChange?.(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (inView && paginate && !loading) {
      paginate(search);
    }
  }, [inView, search]);

  const currentSelected = value === null ? '' : value?.label;

  const isHidden = (option: Option) => {
    const found = option.label.toLowerCase().match(search.toLowerCase());
    return found !== null;
  };

  const filteredOptions = search.length > 0 && !paginate ? options.filter(isHidden) : options;

  return (
    <div className={clsx(cls.Container, className || '')}>
      {label && (
        <label
          className={cls.Label}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={clsx(cls.Input, {
          [cls.InputError]: error,
          [cls.InputActive]: isOpen,
          [cls.InputDisabled]: disabled,
        })}
      >
        <div className={cls.Value}>
          {currentSelected ? (
            <span>{currentSelected}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </div>
        <div className={cls.Icon}>
          <ArrowFlatDownIcon width={20} height={20}/>
        </div>
      </div>

      {isOpen && (
        <FloatingPortal id={'dropdown'}>
          <FloatingFocusManager context={context} modal={false}>
            <div
              className={cls.contextMenu}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {isSearchable && (
                <div className={cls.SearchContainer}>
                  <label className={cls.Search}>
                    <SearchIcon
                      width={20}
                      height={20}
                      className={cls.SearchIcon}
                    />
                    <input
                      type='text'
                      placeholder={lang.text.search}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                      value={search}
                    />
                  </label>
                </div>
              )}
              {loading ? (
                <div>Загрузка...</div>
              ) : filteredOptions.map((option) => (
                <OptionItem
                  key={option.value as number | string}
                  isSelected={value !== null && option?.value === value?.value}
                  onChange={onChangeHandler}
                  option={option}
                />
              ))}
              {filteredOptions.length === 0 && !loading && (
                <div>
                  <span>{lang.text.notFound}</span>
                </div>
              )}
              <div ref={lastOptionRef}/>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}

      {hint && (
        <p
          className={cls.Hint}
        >
          {hint}
        </p>
      )}
      {error && (
        <span role={'validation-error'} className={'error'}/>
      )}
    </div>
  );
};
