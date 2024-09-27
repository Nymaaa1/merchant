import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();
        console.log("--" + JSON.stringify(body));
        const res = await axios.put(
            process.env.MONPAY_API_URL +
            "/branch/password/reset",
            body,
        );
        console.log("--" + JSON.stringify(res.data));
        const data = res.data;
        if (res.status === 200) return NextResponse.json(data, { status: 200 });
        else return NextResponse.json(
            { info: 'Unexpected status code' },
            { status: res.status }
        );
    } catch (error: unknown) {
        console.log("--" + JSON.stringify(error));
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
