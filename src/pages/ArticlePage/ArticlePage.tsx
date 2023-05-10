import { FC, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import cuid from 'cuid';

import { fetchSingleArticle } from '../../Store/SingleArticleSlice';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { textCut } from '../../utils/text';

import style from './ArticlePage.module.scss';

const ArticlePage: FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { loading, article, error } = useAppSelector((state) => state.article);
  const { createdAt, author, tagList, title, body } = useAppSelector(
    (state) => state.article.article
  );
  const { username, image } = author;

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const artDate = new Intl.DateTimeFormat('en-Us', dateOptions);

  useEffect(() => {
    dispatch(fetchSingleArticle(slug!));
  }, [dispatch, slug]);

  return (
    <div className={style.articlesItem}>
      {error && <h2>An error occured: {error}</h2>}
      {loading && <h2>Loading...</h2>}
      <div className={style.artInfo}>
        <p className={style.title}>{title}</p>
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
          <p className={style.userName}>{username}</p>
          <p className={style.userDate}>{artDate.format(new Date(createdAt))}</p>
        </div>
        <div className={style.userImg}>
          <img src={image} alt="userImg" />
        </div>
      </div>
    </div>
  );
};

export { ArticlePage };
