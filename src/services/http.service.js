import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_DEV_LOCAL,
  withCredentials: true
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_DEV_LOCAL,
  headers: { 'Content-Type': 'application.json' },
  withCredentials: true
});
