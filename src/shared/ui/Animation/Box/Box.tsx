import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BoxProps {
  children: ReactNode
}

export const Box = (props: BoxProps) => {
  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        height: 'auto',
        opacity: 1,
        transition: {
          height: {
            duration: 0.4,
          },
          opacity: {
            duration: 0.25,
            delay: 0.25,
          },
        },
      }}
      exit={{
        height: 0,
        opacity: 0,
        transition: {
          height: {
            duration: 0.4,
          },
          opacity: {
            duration: 0.25,
          },
        },
      }}
    >
      {props.children}
    </motion.div>
  );
};
