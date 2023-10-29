import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import { getAuthenticatedUser, unauthenticatedResponse } from '@/utils/auth';
import Product from '@/models/Product';

export async function POST(request: NextRequest) {
	await connect();
	const authUser = await getAuthenticatedUser()
	if (!authUser) return unauthenticatedResponse;

	try {
		const data = await request.json();
		const product = await Product.create({...data, user: authUser._id })

		return NextResponse.json(product, { status: 201 });
	} catch(error) {
		return NextResponse.json({ message: 'Server error' }, { status: 500 });
	}
}
