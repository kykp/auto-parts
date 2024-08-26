import {Dropdown} from '@/shared/ui/Dropdown';

import {useDispatch} from "react-redux";
import {openModal} from "@/entities/Modals/model/slice/modalsSlice.ts";
import {dropdownMenuItems} from "@/shared/consts/dropdownMenuItems.tsx";
import {ModalTypes} from "@/widgets/Modals";
import {routePaths} from "@/app/providers/router";
import {useNavigate} from "react-router-dom";

export interface DropdownListProps {
  id: number;
  name: string;
}

export const DropdownList = (props: DropdownListProps) => {
  const {id, name} = props;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(openModal({
      modalType: ModalTypes.DeletePriceItem,
      modalProps: {id, name}
    }));
  };

  const onEdit = () => {
    navigate(routePaths.editPriceItem.replace(':id', props.id + '?isEdit'));
  };

  return (
    <Dropdown list={[
      { ...dropdownMenuItems.edit, cb: onEdit },
      {...dropdownMenuItems.delete, cb: onDelete},
    ]}/>
  );
};
