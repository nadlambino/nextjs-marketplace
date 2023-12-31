import { getUserByEmail, signIn, signUp } from '@/services/auth';
import { User } from '@/types';
import { getServerSession, type Awaitable, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';

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
          return (await signUp(credentials)) as Awaitable<any>;
        }

        return (await signIn(credentials)) as Awaitable<any>;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session }) {
      session.user = await getUserByEmail(session.user?.email);
      return session;
    },
  },
};

export const unauthenticatedResponse = NextResponse.json({message: "Unauthenticated."}, {status: 401});

export async function getAuthenticatedUser() : Promise<User|undefined> {
	const session = await getServerSession(authOptions);
	
  return session?.user as User;
}
