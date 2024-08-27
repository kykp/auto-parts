import {Section} from "@/shared/ui/Section";
import PageConfig from "@/pages/PricePage/config/PageConfig.ts";
import {AppLink} from "@/shared/ui/AppLink";
import {routePaths} from "@/app/providers/router";
import {Button} from "@/shared/ui/Button";
import {DeleteIcon, MinusIcon, PlusIcon} from "@/shared/Icon";
import {lang} from "@/shared/consts/lang.ts";
import cls from './Title.module.scss';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {openModal} from "@/entities/Modals/model/slice/modalsSlice.ts";
import {ModalTypes} from "@/widgets/Modals";

export const Title = () => {

  const dispatch = useAppDispatch()

  const openDeleteModal = () => {
    dispatch(openModal({
      modalType: ModalTypes.DeletePrice
    }))
  }

  return (
    <Section.Title title={PageConfig.header.title}>
      <div className={cls.wrapper}>
        <AppLink to={routePaths.createPriceItem}>
          <Button Icon={PlusIcon}>
            {lang.btn.create}
          </Button>
        </AppLink>
        <AppLink to={routePaths.uploadPrice}>
          <Button Icon={PlusIcon}>
            {lang.btn.xlsx}
          </Button>
        </AppLink>
        <AppLink to={routePaths.downloadPrice}>
          <Button Icon={MinusIcon} theme='light-clear'>
            {lang.btn.xlsx}
          </Button>
        </AppLink>

          <Button Icon={DeleteIcon} onClick={openDeleteModal} theme='remove'>
            {lang.btn.delete}
          </Button>
      </div>
    </Section.Title>
  )
}
