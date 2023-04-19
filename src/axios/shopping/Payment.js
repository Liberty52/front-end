import axios from "../axios";
import {HttpStatusCode} from "axios";

export function prepareCard(dto) {
    return new Promise(res => {
        axios
            .post('/product/orders/payment/card/prepare',
                JSON.stringify(dto),
                {
                    headers: {
                        'Content-Type': `application/json`,
                    }
                }
            )
            .then(response => {
                res(response.data.merchantUid);
            })
            .catch(e => {
                console.log(e);
                alert("결제 요청에 실패했습니다.");
            })
    });
}

export function checkPayApproval(dto) {
    axios
        .post('/product/orders/payment/card',
            JSON.stringify(dto),
            {
                headers: {
                    'Content-Type': `application/json`,
                }
            }
        )
        .then(response => {
            if (response.status === HttpStatusCode.Ok) {
                // 결제 완료 -> 주문 조회 페이지로 이동
                alert("결제가 완료되었습니다.");

            } else if (response.status === HttpStatusCode.BadRequest) {
                alert("결제가 실패하였습니다. 결제가 위조 되었을 가능성이 있습니다.");
            } else {
                alert('결제가 실패하였습니다.');
            }
        })
        .catch(e => {
            console.log(e);
            alert("결제가 실패하였습니다.");
        });
}