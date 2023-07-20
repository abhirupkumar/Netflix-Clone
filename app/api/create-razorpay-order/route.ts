import { NextRequest, NextResponse } from 'next/server';
import razorpay from 'razorpay';

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();
        const razorpayInstance = new razorpay({
          key_id: <string>process.env.RAZORPAY_KEY,
          key_secret: <string>process.env.RAZORPAY_SECRET,
        });

        const payment_capture = 1;
        const options = {
          amount: (amount * 100).toString(), // Amount in paise or smallest currency unit
          currency: 'INR',
          receipt: 'order_receipt',
          payment_capture,
        };

        const order = await razorpayInstance.orders.create(options);
        return NextResponse.json({ id: order.id });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create Razorpay order' });
    }
};