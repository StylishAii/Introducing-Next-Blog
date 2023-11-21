import connect from '@/utils/server-helper';
import Users from '@/models/Users';
import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt';

export const POST = async(req: Request)=>{
    const{name,email,password} = await req.json();
    await connect();
    const existingUser = await Users.findOne({email})
    
    if(existingUser) { //if there is an existing user with the same email
        return new NextResponse("Email is already in use", {status:400}) //throw a Next.js Response with an error
    }
    
    const hashedPassword = await bcrypt.hash(password,10) // hashing user password before actually sending it to the database
    if(!name || !email || !password) {
        return NextResponse.json({message:"Invalid Data"}, {status:422})
    }
    
    const newUser = new Users({
        name,
        email,
        password: hashedPassword,
    })
    try {
        await newUser.save();
        return NextResponse.json("User is registered",{status:200})
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({message: "Server error"},{status:500})

    }
    
}