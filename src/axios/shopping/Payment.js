import axios from "../axios";

export function prepareCard(dto, file) {
  const formData = new FormData();
  formData.append("imageFile", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  const receiverPhoneNumber = dto.destinationDto.receiverPhoneNumber;
  console.log(receiverPhoneNumber);
  if (localStorage.getItem("ACCESS_TOKEN")) {
    return new Promise((res) => {
      axios
        .post("/product/orders/payment/card/prepare", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: localStorage.getItem("ACCESS_TOKEN"),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          console.log(e);
          alert("카드결제 요청에 실패했습니다.");
        });
    });
  } else {
    return new Promise((res) => {
      axios
        .post("/product/guest/orders/payment/card/prepare", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: receiverPhoneNumber,
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          console.log(e);
          alert("카드결제 요청에 실패했습니다.");
        });
    });
  }
}

export function prepareCardCart(dto) {
  const formData = new FormData();
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  const receiverPhoneNumber = dto.destinationDto.receiverPhoneNumber;
  if (localStorage.getItem("ACCESS_TOKEN")) {
    return new Promise((res) => {
      axios
        .post("/product/orders/payment/card/prepare/carts", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: localStorage.getItem("ACCESS_TOKEN"),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          console.log(e);
          alert("카드결제 요청에 실패했습니다.");
        });
    });
  } else {
    return new Promise((res) => {
      axios
        .post("/product/guest/orders/payment/card/prepare/carts", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: receiverPhoneNumber,
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          console.log(e);
          alert("카드결제 요청에 실패했습니다.");
        });
    });
  }
}

export function checkPayApproval(orderId) {
  return axios.get("/product/orders/payment/card/confirm/" + orderId, {
    headers: {
      "Content-Type": `application/json`,
      Authorization: localStorage.getItem("ACCESS_TOKEN"),
    },
  });
}

export function getVBankInfos() {
  return axios.get("/product/orders/payment/vbank");
}

export function payByVBank(dto, file) {
  const formData = new FormData();
  formData.append("imageFile", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  const receiverPhoneNumber = dto.destinationDto.receiverPhoneNumber;
  if (localStorage.getItem("ACCESS_TOKEN")) {
    return new Promise((res) => {
      axios
        .post("/product/orders/payment/vbank", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: localStorage.getItem("ACCESS_TOKEN"),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          const eData = e.response.data;
          alert(
            `가상계좌 결제 요청이 실패하였습니다.\n에러코드: ${eData.errorCode}\n에러메시지:\n${eData.errorMessage}`
          );
        });
    });
  } else {
    return new Promise((res) => {
      axios
        .post("/product/guest/orders/payment/vbank", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: receiverPhoneNumber,
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          const eData = e.response.data;
          alert(
            `가상계좌 결제 요청이 실패하였습니다.\n에러코드: ${eData.errorCode}\n에러메시지:\n${eData.errorMessage}`
          );
        });
    });
  }
}

export function payByVBankCart(dto) {
  const formData = new FormData();
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  const receiverPhoneNumber = dto.destinationDto.receiverPhoneNumber;
  if (localStorage.getItem("ACCESS_TOKEN")) {
    return new Promise((res) => {
      axios
        .post("/product/orders/payment/vbank/carts", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: localStorage.getItem("ACCESS_TOKEN"),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          const eData = e.response.data;
          alert(
            `가상계좌 결제 요청이 실패하였습니다.\n에러코드: ${eData.errorCode}\n에러메시지:\n${eData.errorMessage}`
          );
        });
    });
  } else {
    return new Promise((res) => {
      axios
        .post("/product/guest/orders/payment/vbank/carts", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: receiverPhoneNumber,
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          const eData = e.response.data;
          alert(
            `가상계좌 결제 요청이 실패하였습니다.\n에러코드: ${eData.errorCode}\n에러메시지:\n${eData.errorMessage}`
          );
        });
    });
  }
}
