export interface ISubmitEditForm {
  username: string;
  email: string;
  password: string;
  image: string;
}

export interface IEditProfileRequest {
  user: {
    username: string;
    email: string;
    password: string;
    image: string;
  };
}
