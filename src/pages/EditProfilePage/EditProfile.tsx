import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { IEditProfileRequest, ISubmitEditForm } from './types';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { editProfile } from '../../Store/Reducers/EditSlice';

import style from './EditProfile.module.scss';

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
    const requestData: IEditProfileRequest = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
      },
    };
    reset();
    dispatch(editProfile(requestData));
    navigate('/', { replace: true });
  };

  return (
    <div className={style.EditProfile}>
      <div className={style.EditProfile_form}>
        <h2 className={style.EditProfile_title}>Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.input_form}>
          <label className={style.input_block}>
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
            New Password
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
          <label className={style.input_block}>
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
          <button className={style.EditProfile_btn}>
            <input type="submit" value="Save" disabled={!isValid} />
          </button>
        </form>
        <div className={style.EditProfile_footer}>
          Already have an account?{' '}
          <Link to="/sign-in">
            <p className={style.redirect}>Sign In.</p>
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
