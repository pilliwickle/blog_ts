import { FC } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';

import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../Store/customHooks';

interface IProps {
  children: ReactElement;
}

const RequireAuth: FC<IProps> = ({ children }) => {
  const location = useLocation();
  const auth = useAppSelector((state) => state.reg.isAuth);

  if (!auth) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};
export { RequireAuth };
