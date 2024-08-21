// import { useNavigate } from 'react-router-dom';
//
// import { routePaths } from '@/app/providers/router';
//
// import { ModalIds, setModal } from '@/entities/Modals';
//
// import { dropdownMenuItems } from '@/shared/consts/dropdownMenuItems';
import { Dropdown } from '@/shared/ui/Dropdown';

import { PriceSchema } from '../../model/types.ts';

interface DropdownListProps {
  id: PriceSchema['id'];
  name: PriceSchema['name'];
  refetch: () => void;
}

export const DropdownList = (props: DropdownListProps) => {
  const {} = props;
  // const navigate = useNavigate();

  // const onDelete = () => setModal(
  //   ModalIds.cityDelete,
  //   { id: props.id, name: props.name, refetch: props.refetch }
  // );

  // const onEdit = () => {
  //   navigate(routePaths.cityEdit.replace(':id', props.id + '?isEdit'));
  // };

  return (
    <Dropdown list={[
      // { ...dropdownMenuItems.edit, cb: onEdit },
      // { ...dropdownMenuItems.delete, cb: onDelete },
    ]} />
  );
};
