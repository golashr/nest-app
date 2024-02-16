import * as dotenv from 'dotenv';
dotenv.config();

export const schema = process.env.DB_SCHEMA || 'public';
