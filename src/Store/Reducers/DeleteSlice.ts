import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  slug: '',
  loading: false,
  error: '',
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const deleteArticle = createAsyncThunk<string, string, { rejectValue: string }>(
  'delete/deleteArticle',
  async function (slug, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue('Cant delete this article!');
    }
    return response.json();
  }
);

const slice = createSlice({
  name: 'delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.slug = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
