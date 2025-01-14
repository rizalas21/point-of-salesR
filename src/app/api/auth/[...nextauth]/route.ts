import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { Session, NextAuthOptions } from "next-auth";
import { Login } from "@/lib/auth/Login";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "auth-session",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const { email, password } = credentials;
          const User = await Login(email, password);
          if (!User) return null;
          return User;
        } catch (err) {
          return alert(err);
        }
      },
    }),
  ],
  secret: process.env.SECRET_AUTH,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const user = token.token;
      session.token = token.accessToken;
      return session;
    },
  },
  pages: { signIn: "/signin" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
