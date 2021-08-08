import axios from "axios";
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: 'https://6109f844d71b670017639b07.mockapi.io/api/v1/test/',
    headers:{
      'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
});

const sleepRequest = (milliseconds: number | undefined, originalRequest: any) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => resolve(axiosClient(originalRequest)), milliseconds);
  });
};

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const { config, response: { status }} = error;
  const originalRequest = config;

  if (status === 429) {
      return sleepRequest(1000, originalRequest);
      
  } else {
      return Promise.reject(error);
  }
});

export default axiosClient