import {Content} from "@/shared/ui/Content";
import cls from "@/features/SignInForm/ui/SignInForm.module.scss";
import {FieldController} from "@/shared/ui/FieldController";
import {lang} from "@/shared/consts/lang.ts";
import {Button} from "@/shared/ui/Button";
import {useForm} from "react-hook-form";
import {defaultValues, FormValues} from "../../config/form.ts";
import {resolver} from "../../config/resolver.ts";
import {useCompanyProfile} from "@/entities/CompanyProfile/hooks/useCompanyProfile/useCompanyProfile.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";
import {authUtils} from "@/shared/lib/authUtils/authUtils.ts";
import {profileActions} from "@/entities/UserProfile/model/slices/userProfileSlice.ts";

interface RegistrationFormProps {
  // goToRecovery: () => void;
  // goToBlock: () => void;
  // goToError: (error: ServerErrorUI) => void;
  // animationScreen?: object;
  // login: (data: AuthData) => void;
  goToLogIn: () => void;
  login: () => void;
}

export const RegistrationForm = (props: RegistrationFormProps) => {
  const {goToLogIn, login} = props;

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: {
      isSubmitting,
    },
  } = useForm<FormValues>({defaultValues, resolver});

  const {creatNewCompany} = useCompanyProfile();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const onSubmit = async (values: FormValues) => {
    if (watchPasOne && watchPasTwo && (watchPasOne !== watchPasTwo)) {
      return setError('passwordSecond', {message: 'Пароли не совпадают'})
    }

    const formattedUserData = {email: values.email, password: values.passwordFirst, companyName: values.companyName};

    try {
      const response = await creatNewCompany(formattedUserData)

      const {id, email} = authUtils({response})

      dispatch(profileActions.login({isAuth: true, me: {id, email}}));

      navigate('/')
    } catch (e) {
      console.log('Ошибка создания пользователя', e)
    }
  }

  const watchPasOne = watch('passwordFirst');
  const watchPasTwo = watch('passwordSecond');

  return (
    <Content className={cls.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form} noValidate={true}>
        <h2>{lang.title.register}</h2>
        <div className={cls.fields}>
          <FieldController.Input
            control={control}
            name={'companyName'}
            label={lang.field.companyName}
          />
          <FieldController.Input
            control={control}
            name={'email'}
            type={'email'}
            inputMode={'email'}
            label={lang.field.email}
          />
          <FieldController.Input
            control={control}
            name={'passwordFirst'}
            label={lang.field.password}
            type={'password'}
          />
          <FieldController.Input
            control={control}
            name={'passwordSecond'}
            label={lang.field.repeatPassword}
            type={'password'}
          />
        </div>

        <div className={cls.buttons}>
          <div className={cls.buttons_actions}>
            <Button
              type={'submit'}
              loading={isSubmitting}
            >
              {lang.btn.register}
            </Button>
            <Button
              theme={"light"}
              onClick={goToLogIn}
              loading={isSubmitting}
            >
              {lang.btn.back}
            </Button>
          </div>
        </div>
      </form>
    </Content>
  )
}
