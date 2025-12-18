import axios from 'axios';

export const login = async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/login`,
    {
      email: import.meta.env.VITE_AUTH_EMAIL,
      password: import.meta.env.VITE_AUTH_PASSWORD,
    }
  );
  return response.data;
};
