import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
     FirebaseAdapter
} from "@next-auth/firebase-adapter"
import { db } from "../../../firebase";

export default NextAuth({
     // Configure one or more authentication providers
     providers: [
          GoogleProvider({
               clientId: "864346289111-vgfsb8khoqct7a34s2ha1nh1sdf2c41o.apps.googleusercontent.com",
               clientSecret: "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",
          }),
          // ...add more providers here
     ],
     callbacks: {
          async session({ session, token }) {
               session.user.tag = session.user.name
                    .split(" ")
                    .join("")
                    .toLocaleLowerCase();

               session.user.uid = token.sub;
               return session;
          },
     },
     secret: "deworiowekwkhixdzusiewhknksihwehewrkolweo9",
     //adapter: FirebaseAdapter(db),
});