import { Scrollbars } from 'rc-scrollbars';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { useWindowSize } from '@/shared/hooks/useWindowSize';
import { useShouldUpdate } from '@/shared/providers/ShouldUpdateProvider';

interface ScrollContentProps {
  height?: number
  children: ReactNode
  hasPagination?: boolean
}

export const ScrollContent = (props: ScrollContentProps) => {

  const ref = useRef<HTMLDivElement | null>(null);
  const [topRect, setTopRect] = useState<number | null>(null);

  const { width, height } = useWindowSize();
  const shouldUpdate = useShouldUpdate();

  useEffect(() => {
    if (ref.current && !props.height) {
      const rect = ref.current?.getBoundingClientRect();
      setTopRect(rect.top);
    }

    if (shouldUpdate) {
      shouldUpdate.setIsUpdate(false);
    }
  }, [ref, shouldUpdate, width, height]);

  const paginationHeight = props.hasPagination ? 101 : 25;

  const size = props.height ?? window.innerHeight - (topRect || 0) - paginationHeight;

  return (
    <div ref={ref}>
      <Scrollbars style={{ height: `${size}px` }}>
        {props.children}
      </Scrollbars>
    </div>
  );
};
