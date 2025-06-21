import WeChat from "@/packages/next-auth/wechat/Wechat";
import NextAuth, { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
    WeChat({
      clientId: process.env.AUTH_WECHAT_APP_ID,
      clientSecret: process.env.AUTH_WECHAT_APP_SECRET,
      platformType: process.env.AUTH_WECHAT_PLATFORM_TYPE, //set platformType: WebsiteApp
    }),
  ],
  events: {
    signIn(message) {
      console.log("signIn", message);
    },
    signOut(message) {
      console.log("signOut", message);
    },
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      console.log("🐽🐽 route.ts jwt token:", token);
      // api get userInfo

      return {
        uuid: token?.sub,
        name: token?.name,
        nickname: token?.name,
        email: token?.email,
      };
      return token;
    },
    async session({ session, token }) {
      console.log("🐽🐽 route.ts session session:", session);
      if (token?.accessToken) session.accessToken = token.accessToken;
      if (token) {
        if (session.user) {
          session.user.uuid = token.uuid;
          session.user.id = token.id as string;
          session.user.name = token.name;
          session.user.nickname = token.nickname;
          session.user.email = token.email;
          session.user.image = token.picture;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth({
  ...authOptions,
});
export { handler as GET, handler as POST };
