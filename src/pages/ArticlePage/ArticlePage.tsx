import { FC, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams, useNavigate } from 'react-router-dom';
import cuid from 'cuid';

import { deleteLike, fetchSingleArticle, setLike } from '../../Store/Reducers/SingleArticleSlice';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { textCut } from '../../utils/text';
import style from './ArticlePage.module.scss';
import nonlike from '../../assets/images/heart_1.png';
import like from '../../assets/images/heart_2.png';
import { deleteArticle } from '../../Store/Reducers/DeleteSlice';
import { Alert, message, Popconfirm, Space, Spin } from 'antd';

const ArticlePage: FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.article);
  const { createdAt, author, tagList, title, body, description, favoritesCount, favorited } =
    useAppSelector((state) => state.article.article);
  const navigate = useNavigate();

  const onClick = () => {
    if (slug) {
      dispatch(deleteArticle(slug));
    }
    navigate('/', { replace: true });
  };
  const handleClick = () => {
    if (slug) {
      dispatch(setLike(slug));
    }

    if (favorited && slug) {
      dispatch(deleteLike(slug));
    }
  };
  const { username } = useAppSelector((state) => state.reg.data);

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

  const cancel = () => {
    message.error('Click on No');
  };

  return (
    <div className={style.div}>
      {error && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={error} type="error" />
        </Space>
      )}
      {loading && (
        <div className={style.spin}>
          <Space size="large">
            <Spin size="large" />
          </Space>
        </div>
      )}
      <div className={style.articleCard}>
        <div className={style.card_info}>
          <div className={style.card_title}>
            <p className={style.card_title__title}>{title}</p>
            <button onClick={handleClick}>
              <img src={favorited ? like : nonlike} alt="like" />
            </button>
            <p className={style.card_title__likeCount}>{favoritesCount}</p>
          </div>
          <p className={style.articleTags}>
            {tagList.map(
              (t) =>
                t.length &&
                t !== ' ' && (
                  <span key={cuid()} className={style.tag}>
                    {`${textCut(t, 15)}`}
                  </span>
                )
            )}
          </p>
          <p className={style.card_info__description}>{description}</p>
          <ReactMarkdown className={style.card_info__body}>{body}</ReactMarkdown>
        </div>
        <div className={style.userPanel}>
          <div className={style.userInfo}>
            <div>
              <p className={style.userInfo_name}>{author.username}</p>
              <p className={style.userInfo_date}>{artDate.format(new Date(createdAt))}</p>
            </div>
            <div className={style.userInfo_img}>
              <img src={author.image} alt="userImg" />
            </div>
          </div>

          {author.username === username && (
            <div className={style.btns}>
              <button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this article?"
                  onConfirm={onClick}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Link className={style.btns_delete} to="/">
                    Delete
                  </Link>
                </Popconfirm>
              </button>
              <Link to="/edit-article">
                <button className={style.btns_edit}>Edit</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
