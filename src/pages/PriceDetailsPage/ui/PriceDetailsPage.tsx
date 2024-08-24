import {PageContent} from "@/widgets/PageTemplates";
import {PriceCreateForm} from "@/features/PriceForm";
import {usePriceList} from "@/entities/PriceList/hooks/usePriceList/usePriceList.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {routePaths} from "@/app/providers/router";

export const PriceDetailsPage = () => {
  const {id} = useParams();

  const {dataById, queryById, isLoadingById} = usePriceList({id});

  useEffect(() => {
    id && queryById();
  }, [id]);

  const isNew = location.pathname === routePaths.createPriceItem;
  const showForm = isNew || location.search.search('isEdit') !== -1;

  return (
    <PageContent>
      {showForm && !isLoadingById && (<PriceCreateForm initialValues={dataById}/>)}
    </PageContent>
  )
}
