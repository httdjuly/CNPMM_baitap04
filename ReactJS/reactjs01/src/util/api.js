import axios from './axios.customize';

const createUserApi = (name, email,password) => {
    const URL_API = "v1/api/register";
    const data = {
        name,
        email,
        password
    };
    return axios.post(URL_API, data);
}

const loginApi = (email, password) => {
    const URL_API = "v1/api/login";
    const data = {
        email,
        password
    };
    return axios.post(URL_API, data);
}

const getUserApi = () => {
    const URL_API = "v1/api/user";
    return axios.get(URL_API);
}
const getProducts = (page = 1, limit = 10, category = "") => {
  let url = `v1/api/products?page=${page}&limit=${limit}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;
  return axios.get(url);
};

export { createUserApi, loginApi, getUserApi, getProducts };