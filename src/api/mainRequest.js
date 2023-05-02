import axios from 'axios';
import env from '@/env.js';

const mainRequest = axios.create({
    baseURL: env.api.MAIN_API_URL,
    timeout: 10000,
    // timeout: 2500,
});

export default mainRequest;