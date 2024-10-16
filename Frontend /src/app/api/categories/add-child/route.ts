import { NextResponse } from 'next/server';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import { Category } from '@/types/categories';

export async function POST(request: Request) {
    const data: Category = await request.json();

    try {
        const response = await axios.post(`${BASE_URL}/categories/${data.parentId}/add-child`, data);
        return NextResponse.json(response.data);
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
