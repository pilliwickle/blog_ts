import { FC, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams, useNavigate } from 'react-router-dom';
import cuid from 'cuid';

import { fetchSingleArticle } from '../../Store/Reducers/SingleArticleSlice';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { textCut } from '../../utils/text';
import style from './ArticlePage.module.scss';
import logo from './heartoutline.png';
import { deleteArticle } from '../../Store/Reducers/DeleteSlice';
import { message, Popconfirm } from 'antd';

const ArticlePage: FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.article);
  const { createdAt, author, tagList, title, body, description, favoritesCount } = useAppSelector(
    (state) => state.article.article
  );
  const { token } = useAppSelector((state) => state.reg.data);
  const navigate = useNavigate();

  const onClick = () => {
    if (slug !== undefined && token !== null) {
      dispatch(deleteArticle({ slug, token }));
    }
    navigate('/', { replace: true });
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

  const confirm = () => {
    message.success('Click on Yes');
  };

  const cancel = () => {
    message.error('Click on No');
  };

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
      <div className={style.userPanel}>
        <div className={style.userInfo}>
          <div>
            <p className={style.userName}>{author.username}</p>
            <p className={style.userDate}>{artDate.format(new Date(createdAt))}</p>
          </div>
          <div className={style.userImg}>
            <img src={author.image} alt="userImg" />
          </div>
        </div>
        {author.username === username && (
          <div className={style.btns}>
            <button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
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
  );
};

export { ArticlePage };
