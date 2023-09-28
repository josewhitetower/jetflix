import axios from 'axios'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`
  },
  params: {
    api_key: process.env.API_KEY
  }
})

export default instance
