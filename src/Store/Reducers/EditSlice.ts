import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEditProfileRequest } from '../../pages/EditProfilePage/types';

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
    username: '',
    bio: '',
    image: '',
  },
  loading: false,
  error: '',
};
const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const editProfile = createAsyncThunk<
  IResponse,
  IEditProfileRequest,
  { rejectValue: string }
>('edit/editProfile', async function (editInfo, { rejectWithValue }) {
  const token = localStorage.getItem('token');
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(editInfo),
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
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
