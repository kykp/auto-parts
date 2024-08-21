import { IconProps } from '@/shared/Icon';

export const ExitIcon = (props: IconProps) => {
  const {
    width = '24',
    height = '24',
    color = '#8383A4',
    className,
  } = props;

  return (
    <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.7959 16.5C18.2398 19.1901 15.3312 21 12 21C7.02942 21 3 16.9706 3 12C3 7.02944 7.02942 3 12 3C15.3312 3 18.2398 4.80989 19.7959 7.5M12 8.4L8.40004 12M8.40004 12L12 15.6M8.40004 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
