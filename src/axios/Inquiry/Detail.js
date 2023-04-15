import axios from 'axios';

export async function fetchOrders(orderId, accessToken) {
  try {
    const response = await axios.get(`https://#/orders/${orderId}`, {
      headers: { Authorization: accessToken },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}
