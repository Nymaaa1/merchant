import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const authHeader = request.headers.get("authorization");
        const config = {
            headers: { Authorization: authHeader },
        };
        const slug = await request.json();
        const res = await axios.get(
            process.env.MONPAY_API_URL +
            "/partner/candy/account/" + slug.accountId + "/journal/merchant?" +
            `beginDate=${slug.beginDate}%2000%3A00%3A00&endDate=${slug.endDate}%2000%3A00%3A00&accountId=${slug.accountId}&limit=20&pagingStart=${slug.pagingStart}`,
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
