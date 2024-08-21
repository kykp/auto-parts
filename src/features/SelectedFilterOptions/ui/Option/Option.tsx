import { useEaseSearchParams } from '@/shared/hooks/useEaseSearchParams';
import { CloseIcon } from '@/shared/Icon';

import { ParamsOption } from '../../config/types';

import cls from './Option.module.scss';

interface OptionProps {
  option: ParamsOption
}

export const Option = (props: OptionProps) => {
  const { option } = props;

  const [_, setParams] = useEaseSearchParams();

  const handleClose = () => {
    setParams((p: object) => ({ ...p, page: 1, [option.paramsName]: null }));
  };

  return (
    <div className={cls.Option}>
      <span>{option?.name} - {option?.text}</span>
      <div onClick={handleClose} className={cls.icon}>
        <CloseIcon width={14} height={14}/>
      </div>
    </div>
  );
};
