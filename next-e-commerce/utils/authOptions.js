import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
import { signIn } from "next-auth/react";

export const authOptions = {
    session: {
        strategy: "jwt", 
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                dbConnect();
                const { email, password } = credentials;
                const user = await User.findOne({ email });

                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const isPasswordMatched = await bcrypt.compare(password, user.password);
                if(!isPasswordMatched) {
                    throw new Error("Invalid email or password");
                }

                return user;
            },
            jwt: async ({ token, user }) => {
                const userByEmail = await User.findOne(  { email: token.email });
                userByEmail.password = undefined;
                userByEmail.resetCode = undefined;
                token.user = userByEmail;
                return token;
            },
            session: async ({session, token}) => {
                session.user = token.user;
                return session;
            },
        },
    ),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
}