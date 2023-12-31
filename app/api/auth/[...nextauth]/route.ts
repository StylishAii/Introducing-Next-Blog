import { PrismaClient } from "@prisma/client";
import NextAuth, {NextAuthOptions, Account, User,Session} from "next-auth"
import  GithubProvider from "next-auth/providers/github"
import  GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/models/Users";
import Sessions from "@/models/Session";
import connect from "@/utils/server-helper";
import bcrypt from 'bcrypt'
import { JWT } from "next-auth/jwt";
const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
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
            async authorize(credentials:any) {
                await  connect();
                try{
                    const user = await Users.findOne({email: credentials.email})
                    if(user) {
                        if(!user.activated) {
                            throw new Error("User is not activated. Check your email, please!")
                        }
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                        if(isPasswordCorrect) {
                            return user;
                        }else {
                            throw new Error("Password is incorrect")
                        }
                    }else{
                        throw new Error("User does not exist!")
                    }
                } catch(err) {
                    throw err; // This is how to throw the same error message that we passed earlier
                }
            }
        }),
    ],
    callbacks: {
        // @ts-ignore
        async signIn({user, account}: {user:User, account: Account}) {
            if(account?.provider === "credentials") {
                return true;
            }
            else if(account?.provider === "github") {
                await connect();
                try{
                    
                    const existingUser = await Users.findOne({email: user.email});
                    if(!existingUser) {
                        const newUser = new Users({
                            email: user.email,
                            name: user.name
                        });
                        await newUser.save();
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
            else if(account.provider === "google") {
                await connect();
                try{
                    
                    const existingUser = await Users.findOne({email: user.email});
                    if(!existingUser) {
                        const newUser = new Users({
                            email: user.email,
                            name: user.name
                        });
                        await newUser.save();
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
        async jwt({token,}: {
            token: JWT,
        }) {
            console.log("jwt callback", {token,})
            return token;
        },
        //@ts-ignore
        async session({session, token}:{
            session: Session,
            token: JWT,
        }) {
            /**
             * Always use connect() before operating any process on your MongoDB database with Mongoose server
             * 
            */
            await connect(); 
            try{
                const existingSession = await Sessions.findOne({email: session.user?.email});
                if(existingSession) {
                    return session;
                } else if(!existingSession){
                    const newSession = new Sessions({
                        email: session.user?.email,
                        createdAt: new Date(),
                        expires: new  Date(session.expires),
                        accessToken: token.sub,
                    });
                    await newSession.save();
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