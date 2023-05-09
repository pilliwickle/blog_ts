import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

import style from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <>
      <div className={style.Layout}>
        <span className={style.logo}>Realworld Blog</span>
        <div className={style.panel}>
          <button>Sign In</button>
          <Link to="/" className={style.panel_btnSignup}>
            Sign Up
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export { Layout };
