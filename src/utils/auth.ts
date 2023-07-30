import { signIn, signUp } from '@/services/auth';
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
      async authorize(credentials, req) {
        const referer: string = req.headers?.referer || '';

        if (!credentials?.email || !credentials?.password) return null;
        if (
          credentials?.firstName &&
          credentials?.lastName &&
          credentials?.gender &&
          credentials?.birthdate &&
          referer.indexOf('signup')
        ) {
          return await signUp(credentials);
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
