import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import ModeloUser from '../../../models/Login';
import conectarDB from '../../../lib/dbConnect';
import bcrypt from 'bcrypt';
conectarDB();

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const email = credentials.email;
                const password = credentials.password;
                const user = await ModeloUser.findOne({ email })
                if (!user) {
                    throw new Error("E-mail ou Senha INCORRETOS")
                }
                if (user) {
                    return signInUser({ password, user })
                }
            }
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        
    },
    secret: "secret",
    database: process.env.MONGODB_URI,

})

const signInUser = async ({ password, user }) => {
    if (!user.password) {
        throw new Error("Por favor informe a senha")
    }
    const isMatch = await bcrypt.compare(password, user);
    if (!isMatch) {
        throw new Error("E-mail/Senha incorretos")
    }
    return user
}