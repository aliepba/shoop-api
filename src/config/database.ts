import dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export const {
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
} = {...process.env } as { [key: string]: string };