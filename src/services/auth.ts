import User from '@/models/User';
import connect from '@/utils/db';
import { encrypt } from './encryption';
import { verify } from './encryption';

export interface IUser extends ICredentials {
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export const signIn = async (credentials: ICredentials) => {
  try {
    await connect();
    const user = await User.findOne({
      email: credentials.email,
    });

    const valid = await verify(user?.password, credentials.password);

    if (user && valid) {
      return user;
    }

    throw new Error('Failed to sign in');
  } catch (e) {
    throw new Error('Failed to sign in');
  }
};

export const signUp = async (credentials: IUser) => {
  try {
    await connect();

    credentials.password = await encrypt(credentials.password);

    const user = await User.create(credentials);

    if (user) {
      return user;
    }

    throw new Error('Failed to create an account');
  } catch (e) {
    throw new Error('Failed to create an account');
  }
};
