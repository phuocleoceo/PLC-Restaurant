import callAPI from './apiService';

export const CHECK_OUT = (body) => callAPI.post("order/checkout", body);