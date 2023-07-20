import { NextRequest, NextResponse } from 'next/server';
import razorpay from 'razorpay';

export async function POST(req: NextRequest) {
    try {
      const { orderId, planType, planId, email, userId, amount } = await req.json();
        const razorpayInstance = new razorpay({
          key_id: <string>process.env.RAZORPAY_KEY,
          key_secret: <string>process.env.RAZORPAY_SECRET,
        });
        
        razorpayInstance.subscriptions.create({
          plan_id: planId,
          total_count: 1,
          quantity: 1,
          customer_notify: 1,
          addons: [
            {
              item: {
                name: userId,
                amount: amount*100,
                currency: "INR"
              }
            }
          ],
          notes: {
            planType,
            orderId,
          },
          notify_info: {
            notify_email: email,
          }
        })

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Payment verification failed' });
    }
};