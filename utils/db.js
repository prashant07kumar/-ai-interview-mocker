// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import { MockInterview } from './schema'; // Adjust the import path as necessary
// const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
// export const db = drizzle(sql, {
//   schema: {
//     MockInterview,
//   },
// });




import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { MockInterview } from './schema'; // Adjust the import path as necessary

const databaseUrl = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;

if (!databaseUrl) {
  throw new Error('NEXT_PUBLIC_DRIZZLE_DB_URL environment variable is not set');
}

const sql = neon(databaseUrl);

export const db = drizzle(sql, {
  schema: {
    MockInterview,
  },
});