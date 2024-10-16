import { NextResponse } from 'next/server';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const updateData = await request.json();
    const { id } = params;

    try {
        const response = await axios.put(`${BASE_URL}/categories/update/${id}`, updateData);
        return NextResponse.json(response.data);
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
