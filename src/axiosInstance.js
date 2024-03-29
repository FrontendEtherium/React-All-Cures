import axios from 'axios';
import { backendHost } from './api-config'; 

const instance = axios.create({
  baseURL: backendHost,
  headers: {
    'Authorization': 'Bearer local@7KpRq3XvF9',
    'Content-Type': 'application/json', 
  }
});

export default instance;
