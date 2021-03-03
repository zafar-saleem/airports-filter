import axios from 'axios'

const instance = axios.create({
  validateStatus: (_status: number) => false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default instance
