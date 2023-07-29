import { IUser, signIn, signUp } from '@/services/auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        firstName: {},
        lastName: {},
        gender: {},
        birthdate: {},
      },
      async authorize(credentials, _req) {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) return null;
        if (
          credentials?.firstName &&
          credentials?.lastName &&
          credentials?.gender &&
          credentials?.birthdate
        ) {
          const user: IUser = {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            gender: credentials.gender,
            birthdate: credentials.birthdate,
            email: credentials.email,
            password: credentials.password,
          };
          return await signUp(user);
        }

        return await signIn(credentials);
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
};
