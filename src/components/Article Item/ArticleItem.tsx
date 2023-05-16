import { textCut } from '../../utils/text';
import style from './ArticleItem.module.scss';
import { Link } from 'react-router-dom';
import nonlike from '../../img/heart 1.png';
import like from '../../img/heart 2.png';
import { IArticle } from '../../types/types';
import { useAppDispatch } from '../../Store/customHooks';
import { deleteLike, setLike } from '../../Store/Reducers/SingleArticleSlice';
import { useState } from 'react';

const ArticleItem = ({
  title,
  tagList,
  author,
  createdAt,
  slug,
  description,
  favorited,
  favoritesCount,
}: IArticle) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const artDate = new Intl.DateTimeFormat('en-Us', dateOptions);
  const dispatch = useAppDispatch();
  const [favoritedLocal, setFavoritedLocal] = useState(favorited);
  const [favoritesCountLocal, setFavoritesCountLocal] = useState(favoritesCount);

  const handleClick = () => {
    if (slug && !favoritedLocal) {
      dispatch(setLike(slug));
      setFavoritedLocal(true);
      setFavoritesCountLocal(favoritesCountLocal + 1);
    }

    if (favoritedLocal && slug) {
      dispatch(deleteLike(slug));
      setFavoritedLocal(false);
      setFavoritesCountLocal(favoritesCountLocal - 1);
    }
  };

  return (
    <div className={style.articleCard}>
      <div>
        <div className={style.card_title}>
          <Link to={`/${slug}`}>
            <p className={style.card_title__title}>{title}</p>
          </Link>
          <button onClick={handleClick}>
            <img
              className={style.card_title__like}
              src={favoritedLocal ? like : nonlike}
              alt="like"
            />
          </button>
          <p className={style.card_title__likeCount}>{favoritesCountLocal}</p>
        </div>
        <p className={style.articleTags}>
          {tagList.map((t, i) => {
            const key = `${t}-${i}`;
            return (
              <span key={key} className={style.tag}>
                {`${textCut(t, 15)}`}
              </span>
            );
          })}
        </p>
        <p className={style.description}>{`${textCut(description, 200)}...`}</p>
      </div>
      <div className={style.userInfo}>
        <div>
          <p className={style.userInfo_name}>{author.username}</p>
          <p className={style.userInfo_date}>{artDate.format(new Date(createdAt))}</p>
        </div>
        <div className={style.userInfo_img}>
          <img src={author.image} alt="userImg" />
        </div>
      </div>
    </div>
  );
};
export { ArticleItem };
