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
      <Link to="/" className={style.logo}>
        Realworld Blog
      </Link>
      {isAuth ? (
        <div className={style.userPanel}>
          <button>
            <Link to="/create-article" className={style.panel_btnSignup}>
              Create Article
            </Link>
          </button>
          <p>
            <Link className={style.username} to="/profile">
              {username}
            </Link>{' '}
          </p>
          <div className={style.userImg}>
            <img src={image} alt="userImg" />
          </div>
          <button onClick={() => dispatch(logOut())} className={style.logoutBtn}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={style.panel}>
          <button>
            <Link to="/sign-in" className={style.sign_in}>
              Sign In
            </Link>
          </button>
          <Link to="/sign-up" className={style.panel_btnSignup}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export { Header };
