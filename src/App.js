import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./screen/Main";
import Login from "./screen/auth/login/Login";
import SignUp from "./screen/auth/signUp/SignUp";
import MyInfo from "./screen/auth/myInfo/MyInfo";
import Redirect from "./screen/auth/redirect/Redirect";
import Purchase from "./screen/shopping/purchase/Purchase";
import Cart from "./screen/shopping/cart/Cart";
import Order from "./screen/product/Order";
import Payment from "./screen/product/payment/Payment";
import ChangePasswordPage from "./screen/auth/redirect/ChangePasswordPage";
import Inquiry from "./screen/shopping/inquiry/Inquiry";
import Detail from "./screen/shopping/detail/Detail";
import "./app.css";

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Main />}></Route>
          <Route path={"/myInfo"} element={<MyInfo />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/signUp"} element={<SignUp />}></Route>
          <Route path={"/redirect"} element={<Redirect />}></Route>
          <Route path={"/purchase"} element={<Purchase />}></Route>
          <Route path={"/cart"} element={<Cart />}></Route>
          <Route path={"/product_speaker/:id"} element={<Order />}></Route>
          <Route path={"/auth/password"} element={<ChangePasswordPage />} />
          <Route path={"/inquiry"} element={<Inquiry />} />
          <Route path={"/detail/:orderId"} element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
