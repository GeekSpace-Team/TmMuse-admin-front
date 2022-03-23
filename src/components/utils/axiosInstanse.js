import axios from 'axios';

export const BaseURL = "http://95.85.119.162:5000/";

export const axiosInstanse = axios.create({
    baseURL:BaseURL,
    timeout: 10000,
    headers : { 
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
      }
});

