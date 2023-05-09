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
  loading: boolean;
  error: string | null;
};

const initialState: IArticlesState = {
  articles: [],
  loading: true,
  error: null,
};

export const fetchArticles = createAsyncThunk<IArticles[], undefined, { rejectValue: string }>(
  'articles/fetchArticles',
  async function (_, { rejectWithValue }) {
    const res = await fetch('https://blog.kata.academy/api/articles');

    if (!res.ok) {
      return rejectWithValue('Server Error!!!');
    }

    const data = await res.json();
    return data.articles;
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
      });
  },
});

export default slice.reducer;
