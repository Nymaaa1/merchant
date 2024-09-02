import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();
        const res = await axios.post(
            `${process.env.MONPAY_API_URL}/partner/login`,
            body
        );
        if (res.status === 200) {
            return NextResponse.json(res.data, { status: 200 });
        } else {
            return NextResponse.json(
                { info: 'Unexpected status code' },
                { status: res.status }
            );
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { info: error.response.data.info },
                { status: error.response.status }
            );
        } else {
            return NextResponse.json(
                { info: "Internal Server Error" },
                { status: 500 }
            );
        }
    }
}
