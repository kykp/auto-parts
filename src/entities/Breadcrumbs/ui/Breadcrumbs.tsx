import clsx from 'clsx';

import {AppLink} from '@/shared/ui/AppLink';
import {ArrowFlatRightIcon, HomeIcon} from '@/shared/Icon';

import {breadCrumb} from '../lib/breadcrumb/breadcrumb';

import cls from './Breadcrumbs.module.scss';


export type breadCrumb = {
  link: string,
  name: string
}

export const Breadcrumbs = () => {

  return (
    <div>
      <AppLink to='/' className={cls.link}>
        <HomeIcon className={cls.icon}/>
      </AppLink>
      <div className={clsx(cls.link, cls.arrow)}>
        {breadCrumb.length && <ArrowFlatRightIcon/>}
      </div>
      {breadCrumb.map((item: breadCrumb, index: number) => (
        <div key={index} className={cls.link}>
          <div>
            <AppLink to={item.link}>
              {item.name && <span>{item.name}</span>}
            </AppLink>
            {index + 1 !== breadCrumb.length && <ArrowFlatRightIcon/>}
          </div>
        </div>
      ))}
    </div>
  );
};
