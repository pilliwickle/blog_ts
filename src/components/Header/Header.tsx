import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { getCurrentUser, logOut } from '../../Store/Reducers/AuthSlice';
import style from './Header.module.scss';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.reg.isAuth);
  const { username, image } = useAppSelector((state) => state.reg.data);

  useEffect(() => {
    const myToken = localStorage.getItem('token');
    if (myToken) {
      dispatch(getCurrentUser(myToken));
    }
  }, []);
  return (
    <div className={style.Header}>
      <Link to="/" className={style.Header_logo}>
        Realworld Blog
      </Link>
      {isAuth ? (
        <div className={style.user_panel}>
          <button>
            <Link to="/create-article" className={style.btn_auth}>
              Create Article
            </Link>
          </button>
          <p>
            <Link className={style.user_name} to="/profile">
              {username}
            </Link>{' '}
          </p>
          <div className={style.user_img}>
            <img src={image} alt="userImg" />
          </div>
          <button onClick={() => dispatch(logOut())} className={style.btn_logout}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={style.Header_panel}>
          <button>
            <Link to="/sign-in" className={style.btn_login}>
              Sign In
            </Link>
          </button>
          <Link to="/sign-up" className={style.btn_auth}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
