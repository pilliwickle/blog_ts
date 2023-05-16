import { FC, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import cuid from 'cuid';

import { fetchSingleArticle } from '../../Store/Reducers/SingleArticleSlice';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { textCut } from '../../utils/text';
import style from './ArticlePage.module.scss';
import logo from './heartoutline.png';

const ArticlePage: FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.article);
  const { createdAt, author, tagList, title, body, description, favoritesCount } = useAppSelector(
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
    if (slug) {
      dispatch(fetchSingleArticle(slug));
    }
  }, [dispatch, slug]);

  return (
    <div className={style.articlesItem}>
      {error && <h2>An error occured: {error}</h2>}
      {loading && <h2>Loading...</h2>}
      <div className={style.artInfo}>
        <div className={style.title_like}>
          <p className={style.title}>{title}</p>
          <img src={logo} alt="heartoutline" />
          <p className={style.favoritesCount}>{favoritesCount}</p>
        </div>
        <p className={style.articlesTags}>
          {tagList.map(
            (t) =>
              t.length &&
              t !== ' ' && (
                <span key={cuid()} className={style.tags}>
                  {`${textCut(t, 15)}`}
                </span>
              )
          )}
        </p>
        <p className={style.description}>{description}</p>
        <ReactMarkdown className={style.articleBody}>{body}</ReactMarkdown>
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
