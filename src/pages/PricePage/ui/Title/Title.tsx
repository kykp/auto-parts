import {Section} from "@/shared/ui/Section";
import PageConfig from "@/pages/PricePage/config/PageConfig.ts";
import {AppLink} from "@/shared/ui/AppLink";
import {routePaths} from "@/app/providers/router";
import {Button} from "@/shared/ui/Button";
import {PlusIcon} from "@/shared/Icon";
import {lang} from "@/shared/consts/lang.ts";
import cls from './Title.module.scss';

export const Title = () => {
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
      </div>
    </Section.Title>
  )
}
