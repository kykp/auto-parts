import { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useBreadcrumb } from '../../hook/useBreadcrumb/useBreadcrumb';

interface BreadcrumbConsumerProps {
  children: ReactNode
  path: string
}

export const BreadcrumbConsumer = (props: BreadcrumbConsumerProps) => {
  const { setPath, setParams } = useBreadcrumb();
  const params = useParams();

  useEffect(() => {
    setPath(props.path);
    setParams(params);
  }, [props.path, params]);

  return props.children;
};
