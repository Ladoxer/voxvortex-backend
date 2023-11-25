import nodemailer from 'nodemailer';
import AuthRepository from '../repositories/authRepository';
import dotenv from 'dotenv';
dotenv.config();

type SendMailParams = {
  name: string;
  email: string;
  userid: string; // Ensure the correct type for userid
};

type SendResetParams = {
  name: string;
  email: string;
  token: string; // Ensure the correct type for token
};

type EmailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export const sendMail = async({name, email, userid }: SendMailParams): Promise<void> => {
  try {
    const otp = generateOTP();
    console.log(otp);
    
    const authRepository = new AuthRepository();
    await authRepository.updateOtp(userid, otp);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'ladderdoxer@gmail.com',
        pass: process.env.PASS as string,
      },
    });

    const mailOptions: EmailOptions = {
      from: 'ladderdoxer@gmail.com',
      to: email,
      subject: 'For email verification',
      html: `<p>Hi ${name}, Your otp for verification is <b>${otp}</b>. Enter the otp and verify your account.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email send -->", info.response);
    
  } catch (error) {
    // console.error(error.message);
    throw error;
  }
}

export const sendreset = async ({ name, email, token }: SendResetParams): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'ladderdoxer@gmail.com',
        pass: process.env.PASS as string, // Ensure correct type
      },
    });

    const mailOptions: EmailOptions = {
      from: 'ladderdoxer@gmail.com',
      to: email,
      subject: 'For Reset Password',
      html: `<p>Hi ${name}, click this link<a href="http://localhost:4200/renewpassword/token=${token}">Reset password</a> to reset your password</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email send-->', info.response);
  } catch (error) {
    // console.error(error.message);
    throw error; // Rethrow the error for higher-level error handling
  }
};

function generateOTP(): string {
  let otp = '';
  const digits = '0123456789';
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}