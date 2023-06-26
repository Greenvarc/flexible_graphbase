import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";

import { getUser } from "./actions";
import { SessionInterface, UserProfile } from "@/common.types";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_CLIENT_KEY!,
        })
    ],
    // jwt: {
    //     encode:  ({secret,token}) => { },
    //     decode:async({secret,token})=>{}
    // },
    theme: {
        colorScheme: 'light',
        logo:'/logo.png'
    },
    callbacks: {
        async session({ session }) {
            return session
        },
        async signIn({ user }: {
            user: AdapterUser | User
          }) {
            try {
                // get error while using this func (error gotten is Attempted import error: 'parse' is not exported from 'graphql' (imported as 'parse').
              const userExists = await getUser(user?.email as string) as { user?: UserProfile }
      
              return true;
            } catch (error: any) {
              console.log("Error checking if user exists: ", error.message);
              return false;
            }
      },
    },
}

// get current user func
export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;
    return session;
}
