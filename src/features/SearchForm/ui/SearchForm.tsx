import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { useEffect, useRef, useState } from 'react';

import { cssColors } from '@/shared/consts/cssColors';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useEaseSearchParams } from '@/shared/hooks/useEaseSearchParams';
import { ArrowFlatDownIcon, CheckIcon } from '@/shared//Icon';
import { SearchField } from '@/shared/ui/SearchField';

import cls from './SearchForm.module.scss';

interface SearchFormProps {
  initialValues: {
    searchValue: string
    searchBy: string
  },
  options?: SelectOption[]
}

export const SearchForm = (props: SearchFormProps) => {

  const {
    initialValues,
    options,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [searchBy, setSearchBy] = useState(
    Array.isArray(options) && options.length > 0 ? options[0].value : ''
  );
  const [debouncedValue, searchValue, setSearchValue] = useDebounce<string>(initialValues.searchValue, 500);
  const [_, setParams] = useEaseSearchParams();
  const refSearchBy = useRef(0);
  const refSearchValue = useRef(0);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-end',
    middleware: [
      offset(5),
    ],
  });

  const click = useClick(context, { event: 'mousedown', keyboardHandlers: false });
  const dismiss = useDismiss(context);

  const {
    getReferenceProps,
    getFloatingProps,
  } = useInteractions([
    click,
    dismiss,
  ]);

  useEffect(() => {
    if (refSearchValue.current > 0) {
      setParams((p: object) => ({ ...p, q: debouncedValue, page: 1 }));
    }

    refSearchValue.current = 1;
  }, [debouncedValue]);

  useEffect(() => {
    if (refSearchBy.current > 0) {
      setParams((p: object) => ({ ...p, searchBy, page: 1 }));
    }

    refSearchBy.current = 1;
  }, [searchBy]);

  return (
    <SearchField searchValue={searchValue} setSearchValue={setSearchValue}>
      {Array.isArray(options) && options.length > 0 && (
        <>
          <div
            className={cls.SearchSelect}
            ref={refs.setReference}
            {...getReferenceProps()}
          >
            <div>
              <span>
                {options.filter((el) => el.value === searchBy)[0].label}
              </span>
              <ArrowFlatDownIcon width={20} height={20} />
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
                  {options.map((el) => (
                    <div
                      role={'option'}
                      key={el.value as string | number}
                      onClick={() => setSearchBy(el.value)}
                      className={cls.Option}
                    >
                      {el.value === searchBy && (
                        <CheckIcon
                          className={cls.OptionIcon}
                          color={cssColors.main}
                          width={16}
                          height={16}
                        />
                      )}
                      <span>{el.label}</span>
                    </div>
                  ))}
                </div>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </>
      )}
    </SearchField>
  );
};
