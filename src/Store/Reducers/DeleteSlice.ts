import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface IProps {
  token: string;
  slug: string;
}

const initialState = {
  token: '',
  slug: '',
};

export const deleteArticle = createAsyncThunk<string, IProps, { rejectValue: string }>(
  'delete/deleteArticle',
  async function (data, { rejectWithValue }) {
    const { token, slug } = data;
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
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.slug = action.payload;
      state.token = action.payload;
    });
  },
});

export default slice.reducer;
