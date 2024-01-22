import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const DISCORD_TOKEN = process.env.TOKEN;

if (!DISCORD_TOKEN || !CLIENT_ID ) {
  throw new Error('Missing environment variables');
}

interface Env {
  DISCORD_TOKEN: string;
  CLIENT_ID: string;
}

const Config: Env = {
  CLIENT_ID,
  DISCORD_TOKEN,
};

export default Config;
