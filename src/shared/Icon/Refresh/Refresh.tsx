import { IconProps } from '../types';

export const RefreshIcon = (props: IconProps) => {

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
        d="M3 10.2222C3 10.2222 3.10919 9.46734 6.27244 6.34315C9.43568 3.21895 14.5643 3.21895 17.7276 6.34315C18.8483 7.45006 19.572 8.80064 19.8986 10.2222M3 10.2222V4.88889M3 10.2222H8.4M21 13.7778C21 13.7778 20.8908 14.5327 17.7276 17.6569C14.5643 20.7811 9.43568 20.7811 6.27244 17.6569C5.15169 16.5499 4.42803 15.1994 4.10145 13.7778M21 13.7778V19.1111M21 13.7778H15.6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
