import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import { getServerSession } from 'next-auth';
import { authOptions, unauthenticatedResponse } from '@/utils/auth';

export async function GET() {
	await connect();
	const session = await getServerSession(authOptions);
	if (!session) return unauthenticatedResponse;

	return NextResponse.json(session);
}

export async function POST() {
	await connect();
	const session = await getServerSession(authOptions);
	if (!session) return unauthenticatedResponse;

	return NextResponse.json(session);
}
