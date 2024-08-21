import {
  arrow,
  autoUpdate,
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  safePolygon,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import { motion } from 'framer-motion';
import  { useRef, useState } from 'react';

import { cssColors } from '@/shared/consts/cssColors';
import { NotificationIcon } from '@/shared/Icon';

import cls from './ValidationError.module.scss';

export interface ValidationErrorProps  {
  message: string
  className?: string
}

export const ValidationError = (props: ValidationErrorProps) => {

  const {
    message,
    className,
  } = props;

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-end',
    middleware: [
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const hover = useHover(context, {
    handleClose: safePolygon({
      buffer: 1,
    }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
  ]);

  return (
    <div className={className}>
      <button
        onClick={toggle}
        onMouseEnter={() => setIsOpen(true)}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <div className={cls.button}>
          <NotificationIcon color={cssColors.error} height={18} width={18} />
        </div>
      </button>
      {isOpen && (
        <FloatingPortal id={'ValidationError'}>
          <div className={cls.arrow} ref={refs.setFloating} style={floatingStyles}>
            <FloatingArrow
              strokeWidth={1}
              fill={cssColors.white}
              stroke={cssColors.border1}
              tipRadius={2}
              ref={arrowRef}
              context={context}
            />
          </div>
          <FloatingFocusManager context={context} modal={false}>
            <motion.div
              className={cls.contextMenu}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: .2 }}
            >
              <p className={cls.text}>
                {message}
              </p>
            </motion.div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
};
