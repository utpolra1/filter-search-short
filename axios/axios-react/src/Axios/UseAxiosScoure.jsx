import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
});

const UseAxiosSecure = () => {
  return axiosSecure;
};

export default UseAxiosSecure;
