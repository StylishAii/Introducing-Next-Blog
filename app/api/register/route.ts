import { connectToDatabase } from '@/helpers/server-helper';
import prisma from '@/prisma';
import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt'

export const POST = async(req: Request)=>{
    try {
        const{name,email,password} = await req.json();
        const hashedPassword = await bcrypt.hash(password,10) // hashing user password before actually sending it to the database
        if(!name || !email || !password) {
            return NextResponse.json({message:"Invalid Data"}, {status:422})
        }
    
        await connectToDatabase();
        const newUser = prisma.user.create({data:{email,name, hashedPassword}})
        return NextResponse.json({newUser},{status:201})
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({message: "Server error"},{status:500})

    }    
    finally{
        prisma.$disconnect();
    }
    
}