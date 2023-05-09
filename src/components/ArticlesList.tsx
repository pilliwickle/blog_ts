import { FC } from 'react';
import { useAppSelector } from '../Store/customHooks';
import { ArticleItem } from './ArticleItem';
import style from './ArticlesList.module.scss';

const ArticlesList: FC = () => {
  const articles = useAppSelector((state) => state.articles.articles);

  return (
    <div className={style.container}>
      {articles.map((art) => (
        <ArticleItem key={art.slug} {...art} />
      ))}
    </div>
  );
};
export { ArticlesList };
