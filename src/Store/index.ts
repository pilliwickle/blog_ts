import { configureStore } from '@reduxjs/toolkit';

import Reducer from './ArticlesSlice';

const store = configureStore({
  reducer: {
    articles: Reducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;