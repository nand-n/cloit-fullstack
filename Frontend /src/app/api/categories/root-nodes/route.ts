import { NextResponse } from 'next/server';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';

export async function GET() {
    try {
        const response = await axios.get(`${BASE_URL}/categories/root-nodes`);
        return NextResponse.json(response.data);
    } catch (error:any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
