import { PrismaClient } from "@prisma/client";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import NextAuth, {NextAuthOptions, Account, User,Session} from "next-auth"
import  GithubProvider from "next-auth/providers/github"
import  GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/models/Users";
import Sessions from "@/models/Session";
import connect from "@/utils/server-helper";
import bcrypt from 'bcrypt'
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient()

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        CredentialsProvider({
            id: "credentials",
            name:"Credentials",
            credentials:{
                email: {label:"Email", type:"text"},
                password: {label: "Password", type:"text"}
            },
            async authorize(credentials) {

                if(!credentials?.email || !credentials.password){
                    return null
                }
                await  prisma.$connect()
                try{
                    const user = await prisma.user.findUnique({
                        where:{
                            email:credentials.email
                        }
                    })

                    if(!user) {
                        return null;
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorrect) {
                        return user;
                    }
                    return null;                
                } catch(err) {
                    throw new Error("Error happened!")
                }
            }
        }),
    ],
    callbacks: {
        // @ts-ignore
        async signIn({user, account}: {user:User, account: Account}) {
            if(account?.provider === "credentials") {
                return user;
            }
            else if(account?.provider === "github") {
                try{
                    
                    const existingUser = await prisma.user.findUnique({where:{
                        email: user.email ?? ""
                    }});
                    if(!existingUser) {
                        // const newUser = new Users({
                        //     email: user.email,
                        //     name: user.name
                        // });
                        await prisma.user.create({
                            data:{
                                 email: user.email ?? "",
                                 name: user.name ?? ""
                            }
                        })

                        return true;
                    }
                    if(existingUser){
                        return true;
                    }
                } catch(err) {
                    console.log("ERROR saving user", err);
                    return false;
                }
            }
        },
        //@ts-ignore
        async jwt({token, user}: {
            token: JWT,
            user: User
        }) {
            return token
        },
        //@ts-ignore
        async session({session, user, token}:{
            session: Session,
            user: User,
            token: JWT
        }) {
            console.log(session)
            /**
             * Always use connect() before operating any process on your MongoDB database with Mongoose server
             * 
            */
            await prisma.$connect();
            try{
                const existingSession = await prisma.session.findFirst({
                    where:{
                        sessionToken: token.sub
                    }
                });
                if(existingSession) {
                    return session;
                } else if(!existingSession){
                    await prisma.session.create({
                        data:{
                            email: token.email ?? "",
                            sessionToken: token.sub ?? "",
                            expires: new Date(session.expires),
                            userId: user.email ?? ""
                        }
                    })
                    return session;
                
                }
                    
            } catch(err) {  
                console.log("ERROR saving session", err);
                return session;
            }
            
        }
        
    },
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    },
    debug: true,
}

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST};