import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IEditProfileRequest } from '../pages/EditProfilePage/types';

interface IResponse {
  username: string;
  email: string;
  token: string;
  bio: string;
  image: string;
}

interface IEditState {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
  loading: boolean;
  error: string;
}

const initialState: IEditState = {
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
  loading: false,
  error: '',
};

export const editProfile = createAsyncThunk<
  IResponse,
  IEditProfileRequest,
  { rejectValue: string }
>('edit/editProfile', async function (editInfo, { rejectWithValue }) {
  const { user } = editInfo;
  const { token, ...info } = user;
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user: info }),
  });

  if (!response.ok) {
    return rejectWithValue('Cant add new user!');
  }

  const data = await response.json();
  return data.user as IResponse;
});

const slice = createSlice({
  name: 'edit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = '';
      });
  },
});

export default slice.reducer;
