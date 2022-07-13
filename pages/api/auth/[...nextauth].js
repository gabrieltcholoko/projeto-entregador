import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import ModeloUser from '../../../models/Login'
await conectarDB();

const isCorrectCredentials = credentials =>
  credentials.username === process.env.NEXTAUTH_USERNAME &&
  credentials.password === process.env.NEXTAUTH_PASSWORD

const options = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await ModeloUser.findOne({user: credentials.username})
                

                if (user && user.password === credentials.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],

    debug: false
}
//https://morioh.com/p/0b89b389eb57
//https://dev.to/portugues/autenticacao-no-nextjs-com-usuario-e-senha-e-criando-rotas-privadas-137
export default (req, res) => NextAuth(req, res, options)