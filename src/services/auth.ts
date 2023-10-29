import User from '@/models/User';
import connect from '@/utils/db';
import { encrypt, verify } from './encryption';
import { Credentials, User as IUser, UserBasicInfo } from '@/types';

export const signIn = async (credentials: Credentials): Promise<IUser> => {
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

export const signUp = async (userInfo: IUser): Promise<IUser> => {
	try {
		await connect();
		userInfo.password = await encrypt(userInfo.password!);
		const user = await User.create(userInfo);

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

const filterUserInfo = (user: IUser) : IUser => {
	return {
		_id: user._id,
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
