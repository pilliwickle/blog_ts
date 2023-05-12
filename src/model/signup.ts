export interface ISignUpRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface ILogin {
  user: {
    email: string;
    password: string;
  };
}
