export interface IUser {
  _id: string;
  first_name: string;
  avatar?: any;
  status: string;
  role: string;
  email: string;
  email_verified: boolean;
  password: string;
  balance: number;
  likes: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
