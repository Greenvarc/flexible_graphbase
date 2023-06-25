import { getServerSession } from "next-auth/next";
import { User, NextAuthOptions } from "next-auth";
import { Adapter, AdapterUser } from "next-auth/adapters";
import Googleprovider from 'next-auth/providers/google'
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface } from "@/common.types";



export const authOptions: NextAuthOptions = {
    providers: [
        Googleprovider({
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
        async signIn({ user }:{user:AdapterUser|User}) {
            try {
                // get usr if exist
                
                // if not create new 
                return true
            } catch (error:any) {
                console.log('error signIn', error);
                return false;
            }
        }
    }
}

// get current user func
export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;
    return session;
}