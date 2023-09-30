import otpGenerator from "otp-generator";
import config from "../config/environmentVariables";
import nodemailer from "nodemailer";
import log from "./logger";
import { OtpModel } from "../models";
import bcrypt from 'bcryptjs';

export const GenCode = async () => {
    return otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
};

export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.AUTH_EMAIL,
      pass: config.AUTH_PASS,
    },
}); 

export const sendMail = async (
    name: string,
    email: string,
    subject: string,
    message: string
  ) => {
    try {
      const mailOptions = {
        from: config.AUTH_EMAIL,
        to: email,
        subject,
        html: message,
      };
      return await transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred while sending email:", error);
        } else {
          console.log("Email sent successfully!", info.response);
        }
      });
    } catch (error: any) {
      log.error(error.message);
    }
  };

 
export const generateAndStoreOTP = async(userEmail:string) => {
  try {
    const findOtp = await OtpModel.findOne({ userEmail });

    const genOtp = await GenCode();
    const hashOtp = await bcrypt.hash(genOtp, 12);

    if (findOtp) {
      findOtp.otp = hashOtp;
      await findOtp.save();
    } else {
      await OtpModel.create({
        otp: hashOtp,
        userEmail,
      });
    }
    return genOtp;
  } catch (error: any) {
    console.error('Error generating and storing OTP:', error);
    return{message: error.message}
  }
}
