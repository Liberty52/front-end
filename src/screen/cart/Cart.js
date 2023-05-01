import CartPrice from "./CartPrice";
import Header from "../../component/Header";
import CartList from "./CartList";
import "./Cart.css";

export default function Cart() {
  return (
    <div>
      <Header />
      <div className="position">
        <div className="cart-left">
          <CartList />
        </div>
        <div className="cart-right">
          <CartPrice></CartPrice>
        </div>
      </div>
    </div>
  );
}
