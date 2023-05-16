import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthRequest, ISubmitForm } from './types';
import { useAppDispatch } from '../../Store/customHooks';
import { registration } from '../../Store/Reducers/AuthSlice';
import style from './AuthPage.module.scss';

const RegPage: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    reset,
  } = useForm<ISubmitForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ISubmitForm> = (data: ISubmitForm) => {
    const requestData: IAuthRequest = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    reset();
    dispatch(registration(requestData));
    navigate('/', { replace: true });
  };

  return (
    <div className={style.RegPage}>
      <div className={style.regForm}>
        <h2 className={style.formTitle}>Create new account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <label className={style.inputBlock}>
            Username
            <input
              {...register('username', {
                required: 'Required field',
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'You can only use lowercase English letters and numbers',
                },
                minLength: {
                  value: 3,
                  message: 'Your username needs to be at least 6 characters',
                },
                maxLength: {
                  value: 30,
                  message: 'Max length 30 letters',
                },
              })}
              placeholder="Username"
              className={style.input}
            />
          </label>
          {errors.username && <p className={style.error}>{errors.username.message}</p>}
          <label className={style.inputBlock}>
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
          <label className={style.inputBlock}>
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
          <label className={style.inputBlock}>
            Repeate password
            <input
              {...register('repeatePass', {
                required: 'Required field!!',
                validate: (value: string, allValues: ISubmitForm) => {
                  const { password } = allValues;
                  return password === value;
                },
              })}
              type="password"
              placeholder="Repeate password"
              className={style.input}
            />
          </label>
          {getValues('repeatePass') !== getValues('password') && (
            <p className={style.error}>Passwords must mutch!</p>
          )}
          {errors.repeatePass && <p className={style.error}>{errors.repeatePass.message}</p>}
          <label className={style.check}>
            <input
              {...register('checkbox', {
                required: 'Required field',
              })}
              type="checkbox"
              className={style.checkBox}
            />
            I agree to the processing of my personal information
          </label>
          {errors.checkbox && <p className={style.error}>{errors.checkbox.message}</p>}
          <button className={style.formBtn}>
            <input type="submit" value="Create" disabled={!isValid} />
          </button>
        </form>
        <div className={style.formFooter}>
          Already have an account?{' '}
          <Link to="/sign-in">
            <p className={style.redirect}>Sign In.</p>
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};
export { RegPage };
