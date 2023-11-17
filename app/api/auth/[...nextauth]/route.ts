import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, {NextAuthOptions} from "next-auth"
import  GithubProvider from "next-auth/providers/github"
import  GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { connectToDatabase } from "@/helpers/server-helper";


const prisma = new PrismaClient();

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
    ],
    callbacks: {
        async session({session}) {
            console.log("jwt callback", {session})
            return session;
        },
        async signIn({profile}) {
            console.log(profile);
            await connectToDatabase();
            return true
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    }
}

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST};