import { IconProps } from '../types';

export const EditIcon = (props: IconProps) => {

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
        d="M17.4347 10.2904L13.7096 6.5653M3 21L6.15176 20.6498C6.53683 20.607 6.72937 20.5856 6.90933 20.5274C7.06899 20.4757 7.22093 20.4027 7.36103 20.3103C7.51894 20.2061 7.65592 20.0692 7.92989 19.7952L20.2285 7.49658C21.2572 6.46792 21.2572 4.80014 20.2285 3.77149C19.1999 2.74284 17.5321 2.74284 16.5034 3.77149L4.20481 16.0701C3.93085 16.3441 3.79387 16.4811 3.68973 16.639C3.59735 16.7791 3.52432 16.931 3.47263 17.0907C3.41437 17.2706 3.39298 17.4632 3.3502 17.8482L3 21Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
