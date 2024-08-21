import { ReactNode, Suspense } from 'react';

import { Container } from '@/shared/ui/Container';

interface PageContentProps {
  children: ReactNode
}

export const PageContent = (props: PageContentProps) => {

  const {
    children,
  } = props;

  return (
    <Container size={'m'}>
      <Suspense>
        {children}
      </Suspense>
    </Container>
  );
};
