export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEUser {
  id: string;
  email: string;
  name: string;
  role: string;
  accountType: string;
  createdAt?: Date;
  updatedAt?: Date;
}