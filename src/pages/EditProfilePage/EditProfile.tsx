import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { IEditProfileRequest, ISubmitEditForm } from './types';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';

import style from './EditProfile.module.scss';
import { editProfile } from '../../Store/Reducers/EditSlice';

const EditProfile: FC = () => {
  const dispatch = useAppDispatch();
  const { username, email } = useAppSelector((state) => state.reg.data);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ISubmitEditForm>({
    mode: 'onChange',
    defaultValues: { username, email },
  });

  const onSubmit: SubmitHandler<ISubmitEditForm> = (data: ISubmitEditForm) => {
    const myToken = localStorage.getItem('token');
    const requestData: IEditProfileRequest = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
        token: myToken!,
      },
    };
    reset();
    dispatch(editProfile(requestData));
    navigate('/', { replace: true });
  };

  return (
    <div className={style.RegPage}>
      <div className={style.regForm}>
        <h2 className={style.formTitle}>Edit Profile</h2>
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
                  message: 'Your username needs to be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Max length 20 letters',
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
            Avatar image(url)
            <input
              {...register('image', {
                required: 'Required field!!',
              })}
              type="text"
              placeholder="Avatar image"
              className={style.input}
            />
          </label>
          {errors.image && <p className={style.error}>{errors.image.message}</p>}
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
export { EditProfile };
