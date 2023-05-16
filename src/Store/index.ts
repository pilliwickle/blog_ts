import { configureStore } from '@reduxjs/toolkit';

import Reducer from './Reducers/ArticlesSlice';
import ArtReducer from './Reducers/SingleArticleSlice';
import SignUpReducer from './Reducers/AuthSlice';
import EditReducer from './Reducers/EditSlice';
import CreateReducer from './Reducers/CreateSlice';

const store = configureStore({
  reducer: {
    articles: Reducer,
    article: ArtReducer,
    reg: SignUpReducer,
    edit: EditReducer,
    create: CreateReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
