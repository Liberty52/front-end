import axios from 'axios';

export function fetchOrderDetails(orderId, accessToken) {
  return axios.get(`/product/orders/${orderId}`, {
    headers: { Authorization: accessToken },
  });
}
