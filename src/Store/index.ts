import { configureStore } from '@reduxjs/toolkit';

import Reducer from './ArticlesSlice';
import ArtReducer from './SingleArticleSlice';
import SignUpReducer from './AuthSlice';
import EditReducer from './EditSlice';

const store = configureStore({
  reducer: {
    articles: Reducer,
    article: ArtReducer,
    reg: SignUpReducer,
    edit: EditReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
