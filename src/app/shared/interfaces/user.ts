export interface User {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  token?: string;
  avatar?: any;
  isAuth?: boolean;
}
