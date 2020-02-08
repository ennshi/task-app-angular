export interface User {
  name?: string;
  email: string;
  password: string;
  token?: string;
  avatar?: any;
  isAuth?: boolean;
}
