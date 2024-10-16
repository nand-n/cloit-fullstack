import { NextResponse } from 'next/server';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const response = await axios.get(`${BASE_URL}/categories/${id}/hierarchy`);
        return NextResponse.json(response.data);
    } catch (error:any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
