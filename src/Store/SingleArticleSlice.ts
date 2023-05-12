import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IArticleState, IArticle } from '../types/types';

const initialState: IArticleState = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '2023-05-10T08:03:42.029Z',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
  loading: false,
  error: null,
};

export const fetchSingleArticle = createAsyncThunk<IArticle, string, { rejectValue: string }>(
  'article/fetchSingleArticle',
  async (slug, { rejectWithValue }) => {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
    if (!res.ok) {
      return rejectWithValue('Server Error!!!');
    }

    return (await res.json()).article as IArticle;
  }
);

const slice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export default slice.reducer;
