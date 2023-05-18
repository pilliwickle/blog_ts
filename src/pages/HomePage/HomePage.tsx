import { FC, useEffect } from 'react';

import ArticlesList from '../../components/ArticleList/ArticlesList';
import { fetchArticles, fetchArticlesCount, changePage } from '../../Store/Reducers/ArticlesSlice';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { Alert, Pagination, Space, Spin } from 'antd';

import style from './HomePage.module.scss';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.articles);
  const articlesCount = useAppSelector((state) => state.articles.articlesCount);

  const currentPage = useAppSelector((state) => state.articles.currentPage);

  useEffect(() => {
    dispatch(fetchArticles(currentPage - 1));
    dispatch(fetchArticlesCount());
  }, [dispatch, currentPage]);
  return (
    <div className={style.HomePage}>
      {loading && (
        <div className={style.spin}>
          <Space size="large">
            <Spin size="large" />
          </Space>
        </div>
      )}
      {error && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={error} type="error" />
        </Space>
      )}
      <ArticlesList />
      <div className={style.pagination}>
        <Pagination
          defaultCurrent={1}
          total={articlesCount}
          current={currentPage}
          onChange={(p) => dispatch(changePage(p))}
          pageSize={5}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};
export default HomePage;
