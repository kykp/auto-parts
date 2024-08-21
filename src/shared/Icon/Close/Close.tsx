import { IconProps } from '../types';

export const CloseIcon = (props: IconProps) => {

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
        d="M6.3424 6.34315L17.6561 17.6569M17.6561 6.34315L6.3424 17.6569"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
