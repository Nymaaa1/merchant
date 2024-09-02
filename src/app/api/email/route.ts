import { sendEmail } from "@/components/email/mail.utils"

export async function POST() {

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