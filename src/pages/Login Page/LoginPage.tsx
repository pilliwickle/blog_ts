import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm, ILogin } from './types';
import { useAppDispatch } from '../../Store/customHooks';
import { login } from '../../Store/Reducers/AuthSlice';
import style from './LoginPage.module.scss';

const SignInPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginForm> = (data: ILoginForm) => {
    const requestData: ILogin = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    reset();
    dispatch(login(requestData));
    navigate('/', { replace: true });
  };

  return (
    <div className={style.LoginPage}>
      <div className={style.LoginPage_form}>
        <h2 className={style.LoginPage_title}>Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.input_form}>
          <label className={style.input_block}>
            Email address
            <input
              {...register('email', {
                required: 'email is not correct',
                pattern: {
                  value:
                    /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
                  message: 'Please enter valid Email!',
                },
              })}
              type="email"
              placeholder="Email address"
              className={style.input}
            />
          </label>
          {errors.email && <p className={style.error}>{errors.email.message} </p>}
          <label className={style.input_block}>
            Password
            <input
              {...register('password', {
                required: 'Required field',
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Max length 40 letters',
                },
              })}
              type="password"
              placeholder="Password"
              className={style.input}
            />
          </label>
          {errors.password && <p className={style.error}>{errors.password.message}</p>}
          <button className={style.LoginPage_btn}>
            <input type="submit" value="Login" disabled={!isValid} />
          </button>
        </form>
        <div className={style.LoginPage_footer}>
          Don`t have an account?{' '}
          <Link to="/sign-in">
            <p className={style.redirect}>Sign Up.</p>
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};
export { SignInPage };
