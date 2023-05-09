import axios from '../axios';

export function fetchOrders(sessionToken) {
  return axios.get('/product/orders', {
    headers: { Authorization: sessionToken },
  });
}
