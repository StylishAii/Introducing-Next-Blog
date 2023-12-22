import connect from '@/utils/server-helper';
import prisma from '@/prisma';
import Users from '@/models/Users';
import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt';

export const POST = async(req: Request)=>{
    const{name,email,password} = await req.json();
    const existingUser = await prisma.user.findUnique({where:{email}})
    
    await prisma.$connect();
    if(existingUser) { //if there is an existing user with the same email
        return new NextResponse("Email is already in use", {status:400}) //throw a Next.js Response with an error
    }
    
    const hashedPassword = await bcrypt.hash(password,10) // hashing user password before actually sending it to the database
    if(!name || !email || !password) {
        return NextResponse.json({message:"Invalid Data"}, {status:422})
    }
    
    try {
        const newUser = await prisma.user.create({
            data:{
                name: name,
                email: email,
                password: hashedPassword
            }
        })
        return NextResponse.json("User is registered:\n"+newUser,{status:200})
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({message: "Server error"},{status:500})

    }
    
}