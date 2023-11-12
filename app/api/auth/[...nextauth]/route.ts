import NextAuth, {NextAuthOptions} from "next-auth"
import  GithubProvider from "next-auth/providers/github"
import  GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST};