import { IconProps } from '@/shared/Icon';

export const LetterIcon = (props: IconProps) => {
  const {
    width = '120',
    height = '120',
    className,
  } = props;

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'
    >
      <rect opacity="0.08" x="-0.865234" y="34.75" width="107.552" height="76.1654" rx="10" transform="rotate(-12.7746 -0.865234 34.75)" fill="#581DFF"/>
      <rect x="8.47168" y="40.2024" width="91.6284" height="61.5898" rx="4.25" transform="rotate(-12.8925 8.47168 40.2024)" stroke="#581DFF" strokeWidth="1.5" fill="#F2EDFF"/>
      <path d="M10.04 41.1738L58.3859 60.6771C59.556 61.1492 60.8964 60.8386 61.7397 59.9001L96.309 21.4275" stroke="#581DFF" strokeWidth="1.5" fill="#F2EDFF"/>
      <path d="M50.5874 65.467C50.8452 65.1429 50.7915 64.6711 50.4673 64.4132C50.1431 64.1553 49.6713 64.2091 49.4135 64.5333L50.5874 65.467ZM49.4135 64.5333L22.618 98.2197L23.7919 99.1535L50.5874 65.467L49.4135 64.5333Z" fill="#581DFF"/>
      <path d="M70.6736 60.6746C70.3007 60.4944 70.1444 60.046 70.3247 59.673C70.5049 59.3001 70.9533 59.1438 71.3263 59.3241L70.6736 60.6746ZM109.634 79.502L70.6736 60.6746L71.3263 59.3241L110.287 78.1514L109.634 79.502Z" fill="#581DFF"/>
    </svg>
  );
};
