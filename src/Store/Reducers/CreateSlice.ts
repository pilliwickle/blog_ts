import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IResponse {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

interface IRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

const initialState: IRequest = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
};

export const createArticle = createAsyncThunk<IResponse, IRequest, { rejectValue: string }>(
  'create/createArticle',
  async function (dataArticle, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(dataArticle),
    });

    if (!response.ok) {
      return rejectWithValue('Cant add new user!');
    }

    const data = await response.json();
    return data.article as IResponse;
  }
);

const slice = createSlice({
  name: 'create',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.article = action.payload;
    });
  },
});

export default slice.reducer;
