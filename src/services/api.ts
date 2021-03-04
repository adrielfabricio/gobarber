import axios from 'axios';

// android emulator ip
const URL = 'http://10.0.2.2:8080';

const api = axios.create({
	baseURL: URL,
});

export default api;
