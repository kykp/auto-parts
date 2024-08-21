import { IconProps } from '../types';

export const ArrowRightIcon = (props: IconProps) => {

  const {
    width = 24,
    height = 24,
    color = '#8383A4',
    className,
  } = props;

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M20 12L14 18M20 12L14 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
