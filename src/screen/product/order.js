import './Order.css';
import Dropdown from "../../component/Dropdown";
import DefaultLayout from "../../component/Layout"
import Button from '../../component/Button';
import { useParams } from 'react-router-dom';

const getProductDetailAPI = (id) => {
    return {
        id,
        name: "Adhesive Screen Surface",
        imageUrl: "https://cdn.imweb.me/thumbnail/20220317/b40c227b9356f.jpg",
        productOptions: {
            holder: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
            ],
            
            material: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
            ],
            materialOption: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
            ]
        }
    }
}

const Order = () => {
    const { id } = useParams();

    const { name, imageUrl, productOptions } = getProductDetailAPI(id); // just mock api

    return (
    <DefaultLayout>
        <div className='order-title'>
            <h2>{name}</h2>
        </div>
        <div className="order">
            <div className="order-image">
                <img src={imageUrl} /> 
            </div>
            <div className='order-inputs'>
                <div className="order-inputs-selects">
                    <Dropdown className={"order-inputs-select"} items={productOptions.holder} title="거치 방식을 선택하세요." placeholder="거치 방식을 선택해주세요. (필수)" />
                    <Dropdown className={"order-inputs-select"} items={productOptions.material} title="기본 소재를 선택하세요." placeholder="기본 소재를 선택해주세요. (필수)" />
                    <Dropdown className={"order-inputs-select"} items={productOptions.materialOption} title="기본 소재 옵션을 선택하세요." placeholder="기본 소재 옵션을 선택해주세요. (필수)" />
                </div>
                <div className="order-inputs-buttons">
                    <div className="order-inputs-button">
                        <Button text="구매하기" />
                    </div>
                    <div className="order-inputs-button">
                        <Button text="장바구니" />
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
    )
}

export default Order