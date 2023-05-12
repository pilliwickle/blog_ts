import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogin, ISignUpRequest } from '../model/signup';

export interface IRes {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface IRequestState {
  data: IRes;
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: IRequestState = {
  data: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
  loading: false,
  error: '',
  isAuth: false,
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const registration = createAsyncThunk<IRes, ISignUpRequest, { rejectValue: string }>(
  'reg/registration',
  async function (regInfo, { rejectWithValue }) {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(regInfo),
    });

    if (!response.ok) {
      return rejectWithValue('Cant add new user!');
    }

    const data = await response.json();
    return data.user as IRes;
  }
);

export const login = createAsyncThunk<IRes, ILogin, { rejectValue: string }>(
  'reg/login',
  async function (loginInfo, { rejectWithValue }) {
    const responseLogin = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });

    if (!responseLogin.ok) {
      return rejectWithValue('Cant add new user!');
    }
    const data = await responseLogin.json();
    const user = data.user as IRes;
    localStorage.setItem('token', user.token);
    return user;
  }
);

export const getCurrentUser = createAsyncThunk<IRes, string, { rejectValue: string }>(
  'get/getCurrentUser',
  async function (token, { rejectWithValue }) {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue('Server Error!!!');
    }

    const data = await response.json();
    const user = data.user as IRes;
    localStorage.setItem('token', user.token);
    return user;
  }
);

export const logOut = createAsyncThunk('reg/logOut', async function () {
  localStorage.removeItem('token');
});

const slice = createSlice({
  name: 'reg',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = '';
        state.isAuth = true;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = '';
        state.isAuth = true;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = '';
        state.isAuth = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isAuth = !state.isAuth;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
