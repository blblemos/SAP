import axios from 'axios';

const api = axios.create({
    baseURL: 'https://apiestagioifba.herokuapp.com'
})

export default api;