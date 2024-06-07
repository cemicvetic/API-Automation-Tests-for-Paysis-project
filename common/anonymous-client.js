import axios from 'axios'

export const anonymousClient = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 15000,
  validateStatus: () => true,
})
