import {Dropdown} from '@/shared/ui/Dropdown';

import {useDispatch} from "react-redux";
import {openModal} from "@/entities/Modals/model/slice/modalsSlice.ts";
import {dropdownMenuItems} from "@/shared/consts/dropdownMenuItems.tsx";
import {ModalTypes} from "@/features/Modals";

export interface DropdownListProps {
  id: number;
  name: string;
}

export const DropdownList = (props: DropdownListProps) => {
  const {id, name} = props;
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({
      modalType: ModalTypes.DeletePriceItem,
      modalProps: {id, name}
    }));
  };

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
      {...dropdownMenuItems.delete, cb: handleOpenModal},
    ]}/>
  );
};
