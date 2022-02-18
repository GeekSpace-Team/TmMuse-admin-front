import axios from 'axios';

export const BaseURL = "http://10.192.168.16:5000/";

export const axiosInstanse = axios.create({
    baseURL:BaseURL,
    headers : { 
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
      }
});

