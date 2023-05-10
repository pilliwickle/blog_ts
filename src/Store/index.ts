import { configureStore } from '@reduxjs/toolkit';

import Reducer from './ArticlesSlice';
import ArtReducer from './SingleArticleSlice';

const store = configureStore({
  reducer: {
    articles: Reducer,
    article: ArtReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
