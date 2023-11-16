import axios from '../axios';
import { ACCESS_TOKEN } from '../../constants/token';
import { INQUIRY } from '../../constants/path';
import { CONTENT_TYPE } from '../../constants/header';

export function fetchOrders(sessionToken) {
  return axios.get('/product/orders', {
    headers: { Authorization: sessionToken },
  });
}

export function cancelOrder(dto, receiverPhoneNumber) {
  axios
    .post('/product/orders/cancel', JSON.stringify(dto), {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN)
          ? sessionStorage.getItem(ACCESS_TOKEN)
          : receiverPhoneNumber,
        'Content-Type': CONTENT_TYPE.ApplicationJson,
      },
    })
    .then((response) => {
      alert(response.data.message);
      window.location.href = INQUIRY;
    })
    .catch((e) => {
      if (e.response) {
        if (e.response.status === 400)
          alert('DTO 문제 또는 이미 주문 취소한 경우 또는 주문 상태가 ORDERED 이상입니다');
        else if (e.response.status === 401) alert('JWT 토큰이 유효하지 않습니다');
        else if (e.response.status === 403) alert('요청자의 주문이 아닙니다');
        else if (e.response.status === 404) alert('요청 주문이 존재하지 않습니다');
        else if (e.response.status === 500) alert('서버 내부 오류');
      }
    });
}

export function fetchRealTimeDeliveryInfo(orderId, phoneNumber, orderDetails, popup) {
  const orderDelivery = orderDetails.orderDelivery;
  const courierCode = orderDelivery.code;
  const trackingNumber = orderDelivery.trackingNumber;

  const getAccessToken = () => {
    return sessionStorage.getItem('ACCESS_TOKEN');
  };

  const fetchUserDeliveryInfo = (accessToken, orderId) => {
    axios
      .get(
        `/product/orders/${orderId}/delivery?courierCode=${courierCode}&trackingNumber=${trackingNumber}`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200 || response.status === 302) {
          if (!popup) {
            alert('팝업 차단을 해제해주세요');
          } else {
            popup.location.href = response.request?.responseURL;
          }
        } else {
          const data = response.json();
          data.then((res) => {
            alert(res.errorName);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchGuestDeliveryInfo = (phoneNumber, orderNumber) => {
    axios
      .get(
        `/guest/product/orders/${orderNumber}/delivery?courierCode=${courierCode}&trackingNumber=${trackingNumber}`,
        {
          headers: {
            Authorization: `${phoneNumber}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200 || response.status === 302) {
          if (!popup) {
            alert('팝업 차단을 해제해주세요');
          } else {
            popup.location.href = response.request?.responseURL;
          }
        } else {
          const data = response.json();
          data.then((res) => {
            alert(res.errorName);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    fetchUserDeliveryInfo(accessToken, orderId);
  } else {
    if (phoneNumber) {
      fetchGuestDeliveryInfo(phoneNumber, orderDetails.orderNum);
    } else {
      const enteredPhoneNumber = prompt('휴대폰 번호를 입력해주세요.');
      fetchGuestDeliveryInfo(orderId, enteredPhoneNumber);
    }
  }
}
