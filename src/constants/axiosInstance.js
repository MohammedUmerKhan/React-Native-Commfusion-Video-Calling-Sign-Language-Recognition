// axiosInstance.js
import {FASTAPI_SERVER_URI} from './contantsServer';

import axios from 'axios';

const instance = axios.create({
  baseURL: FASTAPI_SERVER_URI, // Replace 'your_base_url_here' with your actual base URL
});

export default instance;
