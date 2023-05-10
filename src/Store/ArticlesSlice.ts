import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

type IAuthor = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

type IArticles = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author: IAuthor;
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
};

type IArticlesState = {
  articles: IArticles[];
  articlesCount: number;
  loading: boolean;
  error: string | null;
};

const initialState: IArticlesState = {
  articles: [],
  articlesCount: 0,
  loading: true,
  error: null,
};

export const fetchArticles = createAsyncThunk<IArticles[], undefined, { rejectValue: string }>(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    const res = await fetch('https://blog.kata.academy/api/articles?limit=5');

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
  reducers: {},
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
      });
  },
});

export default slice.reducer;
