import Header from "../../component/Header";
import CartList from "./CartList";
import "./Cart.css";

export default function Cart() {
  return (
    <div>
      <Header />
      <div className="position">
        <CartList />
      </div>
    </div>
  );
}
