import clsx from 'clsx';
import {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';

import {Button} from '@/shared/ui/Button';
import {ArrowLeftIcon} from '@/shared/Icon';
import {Separator} from '@/shared/ui/Separator';

import cls from './Section.module.scss';

interface SectionProps {
  children: ReactNode
  className?: string
  title?: string
  isSeparator?: boolean
}

export const Section = (props: SectionProps) => {

  const {
    children,
    className,
    title,
    isSeparator,
  } = props;

  return (
    <div className={cls.Container}>
      <div className={clsx(cls.Section, className || '')}>
        <div className={cls.left}>
          <span>{title}</span>
        </div>
        <div className={cls.right}>
          {children}
        </div>
      </div>
      {isSeparator && (
        <Separator className={cls.separator}/>
      )}
    </div>
  );
};

interface SectionHeaderProps {
  title?: string
  children?: ReactNode
  isBack?: boolean
}

Section.Header = (props: SectionHeaderProps) => {
  return (
    <>
      <div className={cls.SectionHeader}>
        {props.title ? (
          <Section.Title title={props.title} isBack={props.isBack}/>
        ) : props.children ? props.children : null}
      </div>
      <Separator/>
    </>
  );
};

interface SectionTitleProps {
  isBack?: boolean
  title: string,
  children?: ReactNode,
}

Section.Title = (props: SectionTitleProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  return (
    <div className={cls.wrapper}>
      {props.isBack && (
        <Button
          mode={'box'}
          theme={'clear'}
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon/>
        </Button>
      )}
      <span className={cls.title}>{props.title}</span>
      <div>{props.children}</div>
    </div>
  );
};

interface SectionFooterProps {
  children: ReactNode
}

Section.Footer = (props: SectionFooterProps) => {
  return (
    <>
      <Separator/>
      <div className={cls.SectionFooter}>
        <div>{props.children}</div>
      </div>
    </>
  );
};
