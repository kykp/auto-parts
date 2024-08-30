// import { AnimatePresence } from 'framer-motion';
import {useState} from 'react';

import {SignInForm} from '@/features/SignInForm';
// import {RegistrationForm} from "@/features/RegistrationForm"

import {useSafeParams} from '@/shared/hooks/useSafeParams';
import {Container} from '@/shared/ui/Container';

// import { Blocked } from '../Blocked/Blocked';
// import { SendEmail } from '../SendEmail/SendEmail';
import cls from './Sign.module.scss';
import {RegistrationForm} from "@/features/RegistrationForm";

type AuthScreens =
  'logIn' |
  'registration' |
  'recovery' |
  'newPassword' |
  'blocked' |
  'sendEmail' |
  'error';

export type ServerErrorUI = {
  message: string;
  from: AuthScreens;
}
const animationScreen = {
  initial: {opacity: 0, transform: 'translateY(-10px)'},
  animate: {opacity: 1, transform: 'translateY(0)'},
  exit: {opacity: 0, transform: 'translateY(10px)'},
  transition: {duration: .5},
  style: {width: '100%'},
};

interface SignProps {
  login: () => void;
}

export const Sign = (props: SignProps) => {
  const {login} = props;

  const {code} = useSafeParams({
    code: {rules: []},
  });

  const [currentScreen, setCurrentScreen] = useState<AuthScreens>(code ? 'newPassword' : 'logIn');
  // const [email, setEmail] = useState<string>('');
  // const [errorMessage, setErrorMessage] = useState<ServerErrorUI | undefined>();

  const goToRegistration = () => setCurrentScreen('registration');
  const goToRecovery = () => setCurrentScreen('recovery');
  const goToLogIn = () => setCurrentScreen('logIn');
  const goToBlock = () => setCurrentScreen('blocked');

  const goToError = (error: ServerErrorUI) => {
    setCurrentScreen('error');
    console.log(error)
    // setErrorMessage({ from: error.from, message: error.message });
  };

  // const goToSendEmail = (email: string) => {
  //   setCurrentScreen('sendEmail');
  //   setEmail(email);
  // };

  return (
    <Container >
      <div className={cls.Sign}>
        {currentScreen === 'logIn' && (
          <SignInForm
            goToError={goToError}
            goToRecovery={goToRecovery}
            goToRegistration={goToRegistration}
            goToBlock={goToBlock}
            animationScreen={animationScreen}
            login={login}
          />
        )}
        {currentScreen === 'registration' && (
          <RegistrationForm
            login={login}
            goToLogIn={goToLogIn}
            // goToRecovery={goToRecovery}
            // goToBlock={goToBlock}
            // goToError={goToError}
            // animationScreen={animationScreen}
            // login={props.login}
          />
        )}
      </div>
    </Container>
  );
};
