import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION_URL);
const db = client.db(process.env.DATABASE_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"], // গুগল অ্যাকাউন্টকে অটো-লিঙ্ক করার অনুমতি দিচ্ছে
    },
  },

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },

  plugins: [jwt()],
});
