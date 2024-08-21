import {useForm} from 'react-hook-form';

import {ServerErrorUI} from '@/widgets/Sign/ui/Sign/Sign';

import {AuthData} from '@/entities/UserProfile';

import {lang} from '@/shared/consts/lang';
import {Button} from '@/shared/ui/Button';
import {Content} from '@/shared/ui/Content';
import {FieldController} from '@/shared/ui/FieldController';
import {LoginIcon} from '@/shared/Icon';
import {defaultValues, FormValues} from '../config/form';
import {resolver} from '../config/resolver';
import cls from './SignInForm.module.scss';
import {useUserProfile} from "@/entities/UserProfile/hooks/useUserProfile/useUserProfile.ts";
import {storeTokens} from "@/entities/UserProfile/lib/storeTokens.ts";
import {useNavigate} from "react-router-dom";

interface SignInFormProps {
  goToRecovery: () => void;
  goToBlock: () => void;
  goToRegistration: () => void;
  goToError: (error: ServerErrorUI) => void;
  animationScreen?: object;
  login: (data: AuthData) => void;
}

export const SignInForm = (props: SignInFormProps) => {

  const {
    // goToRecovery,
    goToRegistration,
    // goToBlock,
    // goToError,
    // login,
  } = props;

  const {
    control,
    handleSubmit,
    // watch,
    // setError,
    formState: {
      // errors,
      isSubmitting,
    },
  } = useForm<FormValues>({
    defaultValues,
    resolver,
  });

  const {logIn} = useUserProfile();
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await logIn(values);

      if (response) {
        const {accessToken, refreshToken} = response.data;
        storeTokens(accessToken, refreshToken);

        navigate('/')
        console.log('Пользователь успешно авторизован');
      }
    } catch (e) {
      console.log('Ошибка авторизации', e)
    }
  }

  return (
    <Content className={cls.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form} noValidate={true}>
        <h2>Авторизация</h2>
        <div className={cls.fields}>
          <div>
            <FieldController.Input
              control={control}
              name={'email'}
              type={'email'}
              inputMode={'email'}
              label={lang.field.email}
            />
          </div>
          <div>
            <FieldController.Input
              control={control}
              name={'password'}
              label={lang.field.password}
              type={'password'}
            />
          </div>
        </div>

        <div className={cls.buttons}>
          <div className={cls.buttons_actions}>
            <Button
              type={'button'}
              theme='light'
              loading={isSubmitting}
              onClick={goToRegistration}
            >
              {lang.btn.register}
            </Button>
            <Button
              type={'submit'}
              loading={isSubmitting}
              Icon={LoginIcon}
            >
              {lang.btn.signIn}
            </Button>
          </div>
          {/*<div>*/}
          {/*  <span*/}
          {/*    onClick={goToRecovery}*/}
          {/*    className={cls.forgot}*/}
          {/*  >*/}
          {/*  {lang.btn.rememberPassword}*/}
          {/*</span>*/}
          {/*</div>*/}
        </div>
      </form>
    </Content>
  );
};
