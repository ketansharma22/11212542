

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test';

let accessToken = null;

// Create an Axios instance
const axiosInstance= axios.create({
  baseURL: API_BASE_URL
});


axiosInstance.interceptors.request.use(
  async (config) => {
    if (!accessToken) {
      await authenticateAndGetToken();
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authenticateAndGetToken = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, {
        companyName: 'affordmed',
        clientID: 'aa462b68-0970-4336-b5f8-6efb9475a9ac',
        clientSecret: 'gMviRlddIPbjrXig',
        ownerName: 'KetanSharma',
        ownerEmail: 'kanu220504@gmail.com',
        rollNo: '11212542',
    });

    accessToken = response.data.access_token;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export default axiosInstance;