import User from '@/models/User';
import connect from '@/utils/db';

export const signIn = async (email: string, password: string) => {
  try {
    await connect();
    const user = await User.findOne({
      email: email,
    });

    if (user && user.password === password) {
      return user;
    }

    throw new Error('Failed to sign in');
  } catch (e) {
    throw new Error('Failed to sign in');
  }
};
