import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { IArticlesState, IArticle } from '../../types/types';

const initialState: IArticlesState = {
  articles: [],
  articlesCount: 0,
  loading: true,
  error: null,
  currentPage: 1,
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const fetchArticles = createAsyncThunk<IArticle[], number, { rejectValue: string }>(
  'articles/fetchArticles',
  async (current, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `https://blog.kata.academy/api/articles?limit=5&offset=${current * 5}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!res.ok) {
      return rejectWithValue('Server Error!!!');
    }

    const data = await res.json();
    return data.articles;
  }
);

export const fetchArticlesCount = createAsyncThunk<number, undefined, { rejectValue: string }>(
  'articles/fetchArticlesCount',
  async (_, { rejectWithValue }) => {
    const res = await fetch('https://blog.kata.academy/api/articles');

    if (!res.ok) {
      return rejectWithValue('Server Error!!!');
    }

    const data = await res.json();
    return data.articlesCount;
  }
);
const slice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchArticlesCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesCount.fulfilled, (state, action) => {
        state.articlesCount = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { changePage } = slice.actions;
export default slice.reducer;
