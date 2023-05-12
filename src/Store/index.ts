import { configureStore } from '@reduxjs/toolkit';

import Reducer from './ArticlesSlice';
import ArtReducer from './SingleArticleSlice';
import SignUpReducer from './AuthSlice';

const store = configureStore({
  reducer: {
    articles: Reducer,
    article: ArtReducer,
    reg: SignUpReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
