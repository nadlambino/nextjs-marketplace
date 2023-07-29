import React from 'react';
import { getServerSession } from 'next-auth';

const Home: React.FC = async () => {
  const session = await getServerSession();

  return (
    <section>
      Home
      <h1>{session ? 'You are signed in' : 'Please sign in'}</h1>
    </section>
  );
};

export default Home;
