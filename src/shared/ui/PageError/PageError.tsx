import { Container } from '@/shared/ui/Container';
import { Content } from '@/shared/ui/Content';
import { Notification } from '@/shared/ui/Notification';
import { NotificationProps } from '@/shared/ui/Notification/Notification';

type PageErrorProps = Pick<NotificationProps, 'title' | 'children'>;

export const PageError = (props: PageErrorProps) => {
  return (
    <Container size={'xs'}>
      <Content>
        <Notification
          type={'warning'}
          title={props.title}
        >
          {props.children}
        </Notification>
      </Content>
    </Container>
  );
};
