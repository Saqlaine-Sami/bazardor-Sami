import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// dev মোডে বারবার নতুন সংযোগ খোলা এড়াতে global এ রাখা হচ্ছে
const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

const client =
    globalForMongo.mongoClient ?? new MongoClient(process.env.MONGODB_URI as string);

if (process.env.NODE_ENV !== "production") {
    globalForMongo.mongoClient = client;
}

export const auth = betterAuth({
    database: mongodbAdapter(client.db()),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false, // সাইন আপের পর অটো লগইন নয়, লগইন পেজে পাঠানো হবে
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
});