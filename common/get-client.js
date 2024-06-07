import axios from 'axios'

export const getClient = () =>
  axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 15000,
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  })
