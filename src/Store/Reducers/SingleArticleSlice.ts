import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { IArticleState, IArticle } from '../../types/types';

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
  error: '',
};

interface IEditForm {
  article: {
    title: string;
    description: string;
    body: string;
    slug: string;
  };
}

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const fetchSingleArticle = createAsyncThunk<IArticle, string, { rejectValue: string }>(
  'article/fetchSingleArticle',
  async function (slug, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    if (!res.ok) {
      return rejectWithValue('Server Error!!!');
    }

    return (await res.json()).article as IArticle;
  }
);

export const setLike = createAsyncThunk<IArticle, string, { rejectValue: string }>(
  'article/setLike',
  async function (slug, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue('Cant delete this article!');
    }

    return (await response.json()).article as IArticle;
  }
);

export const deleteLike = createAsyncThunk<IArticle, string, { rejectValue: string }>(
  'article/deleteLike',
  async function (slug, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'Delete',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue('Cant delete this article!');
    }

    return (await response.json()).article as IArticle;
  }
);

export const editArticle = createAsyncThunk<IArticle, IEditForm, { rejectValue: string }>(
  'article/editArticle',
  async function (data, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    const { article } = data;
    const { slug, ...info } = article;
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: info }),
    });

    if (!response.ok) {
      return rejectWithValue('Cant edit this article!');
    }

    const newArticle = await response.json();
    return newArticle as IArticle;
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
      })
      .addCase(setLike.fulfilled, (state, action) => {
        state.article.favorited = true;
        state.article = action.payload;
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        state.article.favorited = false;
        state.article = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
