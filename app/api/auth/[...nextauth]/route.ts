import { PrismaClient } from "@prisma/client";
import NextAuth, {NextAuthOptions, Account, User as AuthUser} from "next-auth"
import  GithubProvider from "next-auth/providers/github"
import  GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/models/Users";
import connect from "@/utils/server-helper";
import bcrypt from 'bcrypt'

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
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                        if(isPasswordCorrect) {
                            return user;
                        }
                    }
                } catch(err) {
                    throw new Error("Error happened!")
                }
            }
        }),
    ],
    callbacks: {
        async signIn({user, account}: {user:AuthUser, account: Account}) {
            if(account?.provider === "credentials") {
                return true;
            }
            else if(account?.provider === "github") {
                await connect();
                try{
                    const existingUser = await Users.findOne({email: user.email});
                    if(!existingUser) {
                        const newUser = new Users({
                            email: user.email
                        });

                        await newUser.save();
                        return true;
                    }
                } catch(err) {
                    console.log("ERROR saving user", err);
                    return false;
                }
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    // session:{
    //     strategy:"jwt"
    // }
}

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST};