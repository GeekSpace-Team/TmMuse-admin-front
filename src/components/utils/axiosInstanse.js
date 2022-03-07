import axios from 'axios';

export const BaseURL = "http://10.192.168.60:5000/";

export const axiosInstanse = axios.create({
    baseURL:BaseURL,
    timeout: 10000,
    headers : { 
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
      }
});

