import { IconProps } from '../types';

export const DownloadIcon = (props: IconProps) => {

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
        d="M21 21H3M18 11L12 17M12 17L6 11M12 17V3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
