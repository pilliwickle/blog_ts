import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

import style from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <footer className={style.footer}>13</footer>
    </>
  );
};
export { Layout };
