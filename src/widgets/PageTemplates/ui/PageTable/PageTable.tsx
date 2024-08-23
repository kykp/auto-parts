import {ReactNode} from 'react';

import {ConfigFilter} from '@/features/Filter';
import {PageControl} from '@/features/PageControl';
import {SearchForm} from '@/features/SearchForm';
import {SelectedFilterOptions} from '@/features/SelectedFilterOptions';
import {SwitchForm, SwitchFormProps} from '@/features/SwitchForm';

import {ShouldUpdateProvider} from '@/shared/providers/ShouldUpdateProvider';
import {Container} from '@/shared/ui/Container';
import {Content} from '@/shared/ui/Content';
import {ScrollContent} from '@/shared/ui/ScrollContent';
import {Section} from '@/shared/ui/Section';
import {Table, TableConfig} from '@/shared/ui/Table';

import {TableFilter} from '../TableFilter/TableFilter';

interface PageTableProps<Data> {
  title?: string;
  children?: ReactNode;
  tableConfig: TableConfig<Data>;
  tableData: Data[];
  total?: number;
  isLoading: boolean;
  page?: string;
  perPage?: string;
  perPageList?: string[];
  searchValue?: string;
  searchBy?: string;
  options?: SelectOption[];
  filterConfig?: ConfigFilter[];
  switchConfig?: SwitchFormProps;
}

export const PageTable = <Data extends { id: string | number }>(
  props: PageTableProps<Data>
) => {

  const {
    title,
    tableConfig,
    children,
    tableData,
    total,
    isLoading,
    page,
    perPage,
    perPageList,
    searchValue,
    searchBy,
    options,
    switchConfig,
    filterConfig,
  } = props;

  const hasPagination = Boolean(page || perPage);

  return (
    <Container size='l'>
      <Content filledHeight>
        <Section.Header title={title}>
          {children}
        </Section.Header>
        {searchValue !== undefined && searchBy !== undefined && (
          <div>
            <div>
              <div style={{flex: '1 0 auto'}}>
                <SearchForm
                  initialValues={{searchValue, searchBy}}
                  options={options}
                />
              </div>
              {filterConfig && (
                <TableFilter config={filterConfig}/>
              )}
              {switchConfig && (
                <div style={{padding: '8px 0 0 0', maxWidth: switchConfig.containerWidth || 180}}>
                  <SwitchForm {...switchConfig} />
                </div>
              )}
            </div>
          </div>
        )}

        <ShouldUpdateProvider>
          {filterConfig && (
            <div>
              <SelectedFilterOptions filterConfig={filterConfig}/>
            </div>
          )}

          <div>
            <ScrollContent hasPagination={hasPagination}>
              <div>
                <Table
                  data={tableData}
                  tableConfig={tableConfig}
                  isLoading={isLoading}
                />
              </div>
            </ScrollContent>
          </div>
        </ShouldUpdateProvider>
      </Content>
      {hasPagination && (
        <div>
          <PageControl
            page={page}
            perPage={perPage}
            perPageList={perPageList}
            total={total}
            isLoading={isLoading}
          />
        </div>
      )}
    </Container>
  );
};
