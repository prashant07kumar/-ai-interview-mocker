// /**@type { import("drizzle-kit").Config} */
// export default {
//   schema: "./utils/schema.js",
//   dialect: 'postgresql',
//   dbCredentials: {
//     url: "postgresql://neondb_owner:npg_mncN7Cu4ZYFR@ep-wispy-dream-a8vgu4s0-pooler.eastus2.azure.neon.tech/ai-interviewer-mocker?sslmode=require",
    
//   },
  
// };




// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" }); // ✅ Load .env.local variables

// /** @type { import("drizzle-kit").Config } */
// export default {
//   schema: "./utils/schema.js",
//   dialect: "postgresql",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL, // ✅ Use from .env.local
//   },
// };




import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./utils/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
});

