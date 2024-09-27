import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const authHeader = request.headers.get("authorization");
        const config = {
            headers: { Authorization: authHeader },
        };
        const res = await axios.get(
            process.env.MONPAY_API_URL +
            "/partner/merchant/info",
            config
        );
        const data = res.data;
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