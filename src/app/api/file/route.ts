import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const authHeader: string | null = request.headers.get("authorization");
        const file = request.body;
        // const config = {
        //     headers: {
        //         Authorization: authHeader,
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data;boundary=None',
        //     }
        // };



        // const res = await fetch(`${process.env.MONPAY_API_URL}/partner/images/upload/partner`, {
        //     method: 'POST',
        //     headers: {
        //         "Authorization": authHeader,
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data;boundary=None',
        //     },
        //     body: file
        // });

        // const data = res.data;
        // if (res.status === 200) 
        return NextResponse.json("data", { status: 200 });
        // else return NextResponse.json(
        //     { info: 'Unexpected status code' },
        //     { status: res.status }
        // );
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
