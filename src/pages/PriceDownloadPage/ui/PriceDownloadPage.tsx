import {Content} from "@/shared/ui/Content";
import {Section} from "@/shared/ui/Section";
import {lang} from "@/shared/consts/lang.ts";
import {Container} from "@/shared/ui/Container";
import {FieldsGetter} from "../ui/FieldsGetter/FieldsGetter.tsx";
import {useForm} from "react-hook-form";
import {Button} from "@/shared/ui/Button";

import cls from './PriceDownloadPage.module.scss';
import {usePriceList} from "@/entities/PriceList/hooks/usePriceList/usePriceList.ts";
import {xlsxCreator} from "@/pages/PriceDownloadPage/config/xlsxCreator.ts";
import {useNavigate} from "react-router-dom";
import {routePaths} from "@/app/providers/router";
import {Loader} from "@/shared/ui/Loader";
import {useState} from "react";

export const PriceDownloadPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {control, watch, handleSubmit} = useForm({})

  const usedHeaders = watch().headers;

  const {query} = usePriceList();

  const navigator = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const selectedHeaders = data?.headers?.map(item => item.value);

      const requestData = await query();
      xlsxCreator(requestData.priceList, selectedHeaders);
      navigator(routePaths.prices);
    } catch (e) {
      console.log('Ошибка выгрузки данных в xlsx', e)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader/>
  }

  return (
    <Container size='m'>
      <Content filledHeight>
        <Section.Header>
          <Section.Title title={lang.title.downloadingXLSXData} isBack/>
        </Section.Header>
        <FieldsGetter control={control} usedHeaders={usedHeaders}/>

        <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
          <Button theme='primary' type='submit'>Download</Button>
        </form>
      </Content>
    </Container>
  )
}
