import { FC, useEffect } from 'react';

import { ArticlesList } from '../../components/ArticlesList';
import { fetchArticles, fetchArticlesCount } from '../../Store/ArticlesSlice';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';

import style from './HomePage.module.scss';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, articles } = useAppSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchArticlesCount());
  }, [dispatch]);
  return (
    <div className={style.HomePage}>
      {loading && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      <ArticlesList />
    </div>
  );
};
export { HomePage };
