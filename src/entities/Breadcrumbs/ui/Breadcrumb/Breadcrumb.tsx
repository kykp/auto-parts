import { AppLink } from '@/shared/ui/AppLink';
import { ArrowFlatRightIcon } from '@/shared/Icon';

import { BreadcrumbItem } from '../../model/types';
import cls from '../Breadcrumbs/Breadcrumbs.module.scss';

interface BreadcrumbProps {
  item: BreadcrumbItem
  isNotLast: boolean
}

export const Breadcrumb = (props: BreadcrumbProps) => {

  const {
    item,
    isNotLast,
  } = props;

  return (
    <div className={cls.link}>
      <div>
        {item.link ? (
          <AppLink to={item.link}>
            <span>{item.name}</span>
          </AppLink>
        ) : (
          <div>
            <span>{item.name}</span>
          </div>
        )}
        {isNotLast && <ArrowFlatRightIcon />}
      </div>
    </div>
  );
};
