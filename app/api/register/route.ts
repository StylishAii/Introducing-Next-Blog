import connect from "@/utils/server-helper";
import prisma from "@/prisma";
import Users from "@/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import ActivateToken from "@/models/ActivateToken";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/emails/email-template";

const isValidEmail = (email: string) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
  return emailRegex.test(email);
};

export const POST = async (req: Request) => {
    await connect();
    const resend = new Resend(process.env.RESEND_KEY);
  const { name, email, password } = await req.json();
  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    //if there is an existing user with the same email
    return NextResponse.json(
      { message: "Email is already in use" },
      { status: 400 }
    ); //throw a Next.js Response with an error
  }

  const hashedPassword = await bcrypt.hash(password, 10); // hashing user password before actually sending it to the database
  if (!name || !email || !password) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Email is not valid" },
      { status: 422 }
    );
  }

  if (!password || password.lenght < 8) {
    return NextResponse.json(
      { message: "Password is invalid or too short" },
      { status: 422 }
    );
  }

  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
    activated:false,
  });

  const newToken = new ActivateToken({
    token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
    userId: newUser._id,
  });
  newUser.activateToken = newToken._id;

  try {
    await newUser.save();
    await newToken.save();
    const {data} = await resend.emails.send({
      from: "hello@shukurdev.pro",
      to: newUser.email,
      subject: "Please Activate Your Account",
      html: `<p>Hello ${newUser.name}, please activate your account by clicking this <a href="${process.env.NEXTAUTH_URL}/activate/${newToken.token}?id=${newUser._id}" >link</a></p><p><b>This link only valid for 24 hours</b></p>`,
    });
    return NextResponse.json(
      { message: "User is registered", redirectURL: "/login" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
