import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

export default function setAuthorizationToken(token) {
    axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
