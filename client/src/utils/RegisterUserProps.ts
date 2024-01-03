export type RegisterUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  admin: boolean;
  createdAt: Date;
};
