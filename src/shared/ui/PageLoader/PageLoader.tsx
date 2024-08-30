import { Container } from '@/shared/ui/Container';
import cls from './PageLoader.module.scss';
import {Content} from "@/shared/ui/Content";

export const PageLoader = () => {

  return (
    <Container className={cls.wrapper}>
      <Content>
        <span>Загрузка страницы</span>
      </Content>
    </Container>
  );
};
