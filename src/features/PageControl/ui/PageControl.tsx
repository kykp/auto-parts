import { useEaseSearchParams } from '@/shared/hooks/useEaseSearchParams';
import { Pagination } from '@/shared/ui/Pagination';
import { PerPage } from '@/shared/ui/PerPage';

interface PageControlProps {
  page?: string
  perPage?: string
  perPageList?: string[]
  total?: number
  isLoading: boolean
}

export const PageControl = (props: PageControlProps) => {

  const {
    page,
    perPage,
    perPageList,
    total,
    isLoading,
  } = props;

  const [_, setParams] = useEaseSearchParams();

  const setPage = (page: string) => {
    setParams((p: object) => ({ ...p, page }));
  };

  const setPerPage = (perPage: number) => {
    setParams((p: object) => ({ ...p, perPage, page: '1' }));
  };

  return (
    <div >
      <Pagination
        total={total}
        page={page}
        perPage={perPage}
        setPage={setPage}
        isLoading={isLoading}
      />
      <PerPage
        perPage={perPage}
        list={perPageList}
        setPerPage={setPerPage}
      />
    </div>
  );
};
