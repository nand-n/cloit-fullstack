import { NextResponse } from 'next/server';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';

export async function POST(request: Request) {
    const { name } = await request.json();

    try {
        const response = await axios.post(`${BASE_URL}/categories/create-root`, { name });
        return NextResponse.json(response.data);
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
