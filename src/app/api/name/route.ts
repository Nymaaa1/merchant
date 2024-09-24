import { NextResponse } from 'next/server';
import axios from 'axios';

export async function PUT(request: Request): Promise<NextResponse> {
    try {

        const authHeader = request.headers.get("authorization");
        const config = {
            headers: { Authorization: authHeader },
        };
        const body = await request.json();
        const res = await axios.put(
            process.env.MONPAY_API_URL +
            "/partner/candy/partner/account/nickname",
            body,
            config
        );
        const data = res.data;
        console.log(data)
        if (res.status === 200) return NextResponse.json(data, { status: 200 });
        else return NextResponse.json(
            { info: 'Unexpected status code' },
            { status: res.status }
        );
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


export async function POST(request: Request): Promise<NextResponse> {
    try {

        const authHeader = request.headers.get("authorization");
        const config = {
            headers: { Authorization: authHeader },
        };
        const body = await request.json();
        const res = await axios.put(
            process.env.MONPAY_API_URL +
            "/partner/candy/update/merchant/phone",
            body,
            config
        );
        const data = res.data;
        console.log(data)
        if (res.status === 200) return NextResponse.json(data, { status: 200 });
        else return NextResponse.json(
            { info: 'Unexpected status code' },
            { status: res.status }
        );
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
