import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://dublin841-nrev-dev.fl0.io/',
    withCredentials: true
})

export default instance