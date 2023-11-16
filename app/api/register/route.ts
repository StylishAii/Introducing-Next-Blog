import { connectToDatabase } from '@/helpers/server-helper';
import prisma from '@/prisma';
import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt'

export const POST = async(req: Request)=>{
    const{name,email,password} = await req.json();
    const hashedPassword = await bcrypt.hash(password,10)
    if(!name || !email || !password) {
        return NextResponse.json({message:"Invalid Data"}, {status:422})
    }

    await connectToDatabase();
    const newUser = prisma.user.create({data:{email}})
}