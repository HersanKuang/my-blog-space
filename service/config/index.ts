import { _SERVER_PORT, _SERVER_URL } from '@/config/next.env';

export const BASE_URL = `${_SERVER_URL}:${_SERVER_PORT}`;
export const TIME_OUT = 1000 * 60;
