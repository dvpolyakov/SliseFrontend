import NextAuth from 'next-auth';
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_KEY!,
            clientSecret: process.env.TWITTER_SECRET!,
            version: "2.0",
        })
    ],
    callbacks: {
        async jwt({ token, account,user, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.username = profile.data.username || null;
                token.id = profile.data.id || null;
                token.profile_image_url = profile.data.profile_image_url || null;
                token.name = profile.data.name || null;

            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.username = token.username;
            session.id = token.id;
            session.profile_image_url = token.profile_image_url;
            session.name = token.name;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
});