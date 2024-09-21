import { sendEmail } from "@/components/email/mail.utils"
import axios from "axios"
import { NextResponse } from "next/server"

export async function GET() {
    const sender = {
        name: "Nyamka",
        address: "Nyamkaotgonbayar2@gmail.com"
    }

    const receipients = [{
        name: "My app",
        address: "Nyamkaotgonbayar5@gmail.com"
    }]

    try {
        const result = await sendEmail({
            sender,
            receipients,
            subject: "bdvndkvnd",
            message: "vudvndkvnd"
        })
        return Response.json({
            accepted: result.accepted
        })
    } catch (e) {
        return Response.json({
            message: "Invalid"
        }, { status: 500 })
    }
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();
        const url = `${process.env.MONPAY_API_URL}/partner/candy/send/online/request`;
        const res = await axios.post(url, body);
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
