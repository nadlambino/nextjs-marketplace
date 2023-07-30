import User from '@/models/User';
import connect from '@/utils/db';
import { encrypt } from './encryption';
import { verify } from './encryption';

export interface IUserBase {
  _id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  avatar?: string;
  address?: {
    city?: string;
    street?: string;
    postalCode?: string;
  };
  seller?: {
    isBanned: boolean;
    bannedReason?: string;
    bannedUntil?: string;
  };
  buyer?: {
    isBanned: boolean;
    bannedReason?: string;
    bannedUntil?: string;
  };
}

export interface IUser extends IUserBase, ICredentials {}

export interface ICredentials {
  email: string;
  password?: string;
}

export const signIn = async (credentials: ICredentials): Promise<IUser> => {
  try {
    await connect();
    const user = await User.findOne({
      email: credentials.email,
    });
    const valid = await verify(user?.password, credentials.password!);

    if (!valid) throw new Error();

    return filterUserInfo(user);
  } catch (e) {
    throw new Error('Failed to sign in');
  }
};

export const signUp = async (credentials: IUser): Promise<IUser> => {
  try {
    await connect();
    credentials.password = await encrypt(credentials.password!);
    const user = await User.create(credentials);

    return filterUserInfo(user);
  } catch (e) {
    throw new Error('Failed to create an account');
  }
};

export const getUserByEmail = async (email: string | undefined | null) => {
  try {
    if (!email) throw new Error();
    await connect();
    const user = await User.findOne({ email });

    return filterUserInfo(user);
  } catch (error) {
    throw new Error('Failed to get user by email');
  }
};

const filterUserInfo = (user: IUser) => {
  return {
    _id: user._id,
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    birthdate: user.birthdate,
    email: user.email,
    address: user.address,
    seller: user.seller,
    buyer: user.buyer,
  };
};
