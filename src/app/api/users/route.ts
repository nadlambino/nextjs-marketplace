import { NextResponse } from 'next/server';
import User from '@/models/User';
import connect from '@/utils/db';

export async function POST() {
  await connect();
  const user = await User.find();

  return NextResponse.json({ user });
}
