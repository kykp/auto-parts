import {ModalDelete} from "@/shared/ui/ModalContent";
import {useDispatch} from "react-redux";
import {closeModal, setShouldRefetch} from "@/entities/Modals/model/slice/modalsSlice.ts";
import {DropdownListProps} from "@/entities/PriceList/ui/DropDownList/DropDownList.tsx";
import {usePriceList} from "@/entities/PriceList/hooks/usePriceList/usePriceList.ts";
import {responseStatusChecker} from "@/shared/consts/responseStatusChecker.ts";
import {lang} from "@/shared/consts/lang.ts";

export const DeletePriceItem = (props: DropdownListProps) => {
  const {id, name} = props;

  const dispatch = useDispatch();
  const {deleteElement} = usePriceList();

  const onCancel = () => {
    dispatch(closeModal())
  }

  const onDelete = async () => {
    try {
      const response = await deleteElement(id);
      const isSuccess = responseStatusChecker(response.status);

      if (!isSuccess) {
        return console.log('Ошибка проверки статуса запроса');
      }
      dispatch(setShouldRefetch());
      onCancel();
    } catch (e) {
      console.log('При удалении элемента возникла ошибка', e)
    }
  }

  return (
    <ModalDelete cancel={onCancel} agree={onDelete}>
      <span>{lang.text.acceptDelete} {name} ?</span>
    </ModalDelete>
  )
}
