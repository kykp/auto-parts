import { motion } from 'framer-motion';

import { lang } from '@/shared/consts/lang';
import { Content } from '@/shared/ui/Content';
import { Notification } from '@/shared/ui/Notification';

interface BlockedProps {
  animationScreen?: object
}

export const Blocked = (props: BlockedProps) => {

  const {
    animationScreen,
  } = props;

  return (
    <motion.div {...animationScreen}>
      <Content>
        <Notification
          type={'warning'}
          title={lang.title.accountBlocked}
          isCustomChildren
        >
          {lang.notification.passwordAttemptsExceeded}
        </Notification>
      </Content>
    </motion.div>
  );
};
