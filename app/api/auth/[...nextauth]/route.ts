import NextAuth, {NextAuthOptions} from "next-auth"
import  GithubProvider from "next-auth/providers/github"
import { NextRequest } from "next/server";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST};