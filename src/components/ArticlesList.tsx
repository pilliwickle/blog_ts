import { Pagination } from 'antd';
import { FC } from 'react';

import { useAppSelector } from '../Store/customHooks';

import { ArticleItem } from './ArticleItem';
import style from './ArticlesList.module.scss';

const ArticlesList: FC = () => {
  const articles = useAppSelector((state) => state.articles.articles);
  const articlesCount = useAppSelector((state) => state.articles.articlesCount);

  return (
    <div className={style.container}>
      {articles.map((art) => (
        <ArticleItem key={art.slug} {...art} />
      ))}
      <div className={style.pagination}>
        <Pagination defaultCurrent={1} total={articlesCount / 5} />
      </div>
    </div>
  );
};
export { ArticlesList };
