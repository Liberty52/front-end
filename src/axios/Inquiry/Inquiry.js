import axios from '../axios';

export function fetchOrders(accessToken) {
  return axios.get('/product/orders', {
    headers: { Authorization: accessToken },
  });
}
