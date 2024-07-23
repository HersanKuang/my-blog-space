import * as process from 'node:process';

const { SERVER_URL } = process.env;

export const BASE_URL = `${SERVER_URL}:9000`;
export const TIME_OUT = 1000 * 60;
