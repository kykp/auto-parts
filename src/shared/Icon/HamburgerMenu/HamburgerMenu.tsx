import { IconProps } from '@/shared/Icon';

export const HamburgerMenuIcon = (props: IconProps) => {
  const {
    width = '24',
    height = '24',
    color = '#8383A4',
    className,
  } = props;

  return (
    <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21M3 6H21M3 18H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
