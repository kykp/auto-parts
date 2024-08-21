import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/pages/ErrorPage';

import { BreadcrumbConsumer } from '@/entities/Breadcrumbs';

import { PageLoader } from '@/shared/ui/PageLoader';

import { appRoutes } from '../model/router';

export const RouterProvider = () => {
  return (
    <Routes>
      {appRoutes?.map((Item) => (
        <Route
          key={Item.path}
          path={Item.path}
          element={
            <BreadcrumbConsumer path={Item.path ?? ''}>
              <Suspense fallback={<PageLoader />}>
                {(Item.Component) && (
                  <Item.Component />
                )}
              </Suspense>
            </BreadcrumbConsumer>
          }
        />
      ))}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};
