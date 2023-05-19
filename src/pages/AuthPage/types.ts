export interface ISubmitForm {
  username: string;
  email: string;
  password: string;
  repeatePass: string;
  checkbox: boolean;
}

export interface IAuthRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}
