import { FC } from 'react';
import cuid from 'cuid';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom';

import { textCut } from '../utils/text';
import { IArticleIItem } from '../types/types';

import style from './ArticleItem.module.scss';

function ArticleItem({ title, tagList, body, author, createdAt, slug }: IArticleIItem) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const artDate = new Intl.DateTimeFormat('en-Us', dateOptions);

  return (
    <div className={style.articlesItem}>
      <div className={style.artInfo}>
        <Link to={`/${slug}`}>
          <p className={style.title}>{title}</p>
        </Link>
        <p className={style.articlesTags}>
          {tagList.map(
            (t) =>
              t.length &&
              t !== ' ' && (
                <span key={cuid()} className={style.tags}>
                  {t}
                </span>
              )
          )}
        </p>
        <ReactMarkdown className={style.articleBody}>{`${textCut(body, 150)}...`}</ReactMarkdown>
      </div>
      <div className={style.userInfo}>
        <div>
          <p className={style.userName}>{author.username}</p>
          <p className={style.userDate}>{artDate.format(new Date(createdAt))}</p>
        </div>
        <div className={style.userImg}>
          <img src={author.image} alt="userImg" />
        </div>
      </div>
    </div>
  );
}
export { ArticleItem };
