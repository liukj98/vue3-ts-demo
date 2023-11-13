import axios from 'axios'

const BASEURL = 'http://localhost:8000/ibpre/'

const instance = axios.create({
  baseURL: BASEURL,
});

export default instance