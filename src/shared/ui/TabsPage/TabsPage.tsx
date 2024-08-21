import clsx from 'clsx';
import { ReactNode } from 'react';

import { useEaseSearchParams } from '@/shared/hooks/useEaseSearchParams';
// import { useWindowSize } from '@/shared/hooks/useWindowSize';

import cls from './TabsPage.module.scss';

export interface TabPage {
  label: string;
  value: string;
}

interface TabsPageProps {
  items: TabPage[];
  currentTab: TabPage['value'],
  className?: string;
}

export const TabsPage = (props: TabsPageProps) => {

  const {
    items,
    currentTab,
    className,
  } = props;

  const [_, setParams] = useEaseSearchParams();
  // const { width } = useWindowSize();

  const setCurrentTab = (value: string) => {
    setParams((p: object) => ({ ...p, tab: value }));
  };

  return (
    <ul className={clsx(cls.Tabs, className|| '')} role="tablist">
      {items.map(el => (
        <li
          className={clsx(cls.TabItem, { [cls.TabItemActive]: currentTab === el.value })}
          key={el.value}
          onClick={() => setCurrentTab(el.value)}
        >
          <span
          >
            {el.label}
          </span>
        </li>
      ))}
    </ul>
  );
};

interface TabsContentProps extends Omit<TabsPageProps, 'setCurrentTab'> {
  children: Iterable<ReactNode>
}

TabsPage.Content = (props: TabsContentProps) => {

  if (!Array.isArray(props.children)) return null;

  return props.items.map((el, i) => (
    <div
      key={el.value}
      role="tabpanel"
      className={clsx(cls.TabContent, { [cls.TabContentActive]: el.value === props.currentTab })}
    >
      {Array.isArray(props.children) && el.value === props.currentTab ? props.children[i] : ''}
    </div>
  ));
};
