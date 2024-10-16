import { NextResponse } from 'next/server';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const response = await axios.delete(`${BASE_URL}/categories/${id}`);
        return NextResponse.json(response.data);
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
