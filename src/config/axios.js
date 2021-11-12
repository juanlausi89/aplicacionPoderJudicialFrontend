import axios from 'axios';

const edificeAxios = axios.create({
    baseURL:'http://localhost:8080'
});

export default edificeAxios;