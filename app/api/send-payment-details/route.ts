import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, whatsapp, address, transactionId, cartItems } = body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Payment Confirmation',
      text: `Thank you for your payment, ${name}. Transaction ID: ${transactionId}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Payment details submitted successfully' });
  } catch (error) {
    console.error('Error processing payment details:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
