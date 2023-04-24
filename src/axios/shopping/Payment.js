import axios from "../axios";

export function prepareCard(dto, file) {
    console.log(file);
    const formData = new FormData();
    formData.append('imageFile', file);
    formData.append(
        'dto',
        new Blob([JSON.stringify(dto)], { type: 'application/json' })
    );
    return new Promise(res => {
        axios
            .post('/product/orders/payment/card/prepare',
                formData,
                {
                    headers: {
                        'Content-Type': `multipart/form-data`,
                        'Authorization': localStorage.getItem('ACCESS_TOKEN'),
                    }
                }
            )
            .then(response => {
                res(response.data);
            })
            .catch(e => {
                console.log(e);
                alert("결제 요청에 실패했습니다.");
            })
    });
}

export function checkPayApproval(orderId) {
    return new Promise(res => {
        axios
            .get('/product/orders/payment/card/confirm/'+orderId,
                {
                    headers: {
                        'Content-Type': `application/json`,
                        'Authorization': localStorage.getItem('ACCESS_TOKEN')
                    }
                }
            )
            .then(response => {
                res(response);
            })
            .catch(e => {
                console.log(e);
            })
    });

}

export function payByVBank() {

}