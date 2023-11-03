import { auth } from '@clerk/nextjs';
import axios, { AxiosError } from 'axios';

import { APIError } from '@/errors/APIError';
import { environment } from '@/utils/environment';
import { getServerBaseURL } from '@/utils/getServerBaseURL';

export const api = axios.create({
  baseURL: getServerBaseURL(),
});

api.interceptors.request.use(async (response) => {
  if (!response.headers.Authorization) {
    let token: string | null = null;

    if (environment() === 'server') {
      const { getToken } = auth();

      token = await getToken();
    }

    if (token) {
      response.headers.Authorization = `Bearer ${token}`;
    }
  }

  return response;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      const data = error.response?.data;

      if (data) {
        throw new APIError(data.message, error.response?.status ?? 500);
      }
    }

    throw error;
  },
);
