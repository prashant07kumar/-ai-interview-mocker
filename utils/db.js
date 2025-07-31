import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { MockInterview } from './schema'; // Adjust the import path as necessary
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
export const db = drizzle(sql, {
  schema: {
    MockInterview,
  },
});