import { FC } from 'react';

import style from './ArticleItem.module.scss';

interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

interface IArticleIItem {
  body: string;
  tagList: string[];
  title: string;
  description: string;
  createdAt: string;
  author: IAuthor;
}

const ArticleItem: FC<IArticleIItem> = (props) => {
  return (
    <div className={style.articlesItem}>
      <div className={style.artInfo}>
        <h2 className={style.title}>Some article title</h2>
      </div>
      <div className={style.userInfo} />
    </div>
  );
};
export { ArticleItem };
