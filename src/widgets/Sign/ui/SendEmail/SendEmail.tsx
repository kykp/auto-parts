import {motion, MotionProps} from 'framer-motion';

import {Content} from '@/shared/ui/Content';
import {Notification} from '@/shared/ui/Notification';

interface SendEmailProps {
  animationScreen: MotionProps;
  email: string;
}

export const SendEmail = (props: SendEmailProps) => {

  const {
    animationScreen,
    // email,
  } = props;

  return (
    <motion.div {...animationScreen}>
      <Content>
        <Notification
          type={'email'}
          title={'Проверьте вашу почту'}
          isCustomChildren
        >
        </Notification>
      </Content>
    </motion.div>
  );
};
