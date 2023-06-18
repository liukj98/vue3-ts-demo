import axios from 'axios'

const BASEURL = 'http://localhost:8000/api/'

const instance = axios.create({
  baseURL: BASEURL,
});

export default instance