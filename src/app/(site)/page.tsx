import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

const Home: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section>
      Home
      <h1>{session?.user ? 'You are signed in' : 'Please sign in'}</h1>
    </section>
  );
};

export default Home;
