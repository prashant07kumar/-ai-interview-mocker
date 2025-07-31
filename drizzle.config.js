/**@type { import("drizzle-kit").Config} */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_mncN7Cu4ZYFR@ep-wispy-dream-a8vgu4s0-pooler.eastus2.azure.neon.tech/ai-interviewer-mocker?sslmode=require",
    
  },
  
};