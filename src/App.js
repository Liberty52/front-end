import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./screen/Main";
import Login from "./screen/auth/login/Login";
import SignUp from "./screen/auth/signUp/SignUp";
import Find from "./screen/auth/find/Find";
import MyInfo from "./screen/auth/myInfo/MyInfo";
import Redirect from "./screen/auth/redirect/Redirect";
import Purchase from "./screen/shopping/purchase/Purchase";
import Cart from "./screen/shopping/cart/Cart";
import Order from './screen/product/Order';
import "./app.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />}></Route>
        <Route path={"/myInfo"} element={<MyInfo />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/signUp"} element={<SignUp />}></Route>
        <Route path={"/find"} element={<Find />}></Route>
        <Route path={"/purchase"} element={<Purchase />}></Route>
        <Route path={"/cart"} element={<Cart />}></Route>
        <Route path={"/redirect"} element={<Redirect />}></Route>
        <Route path={'/product_speaker/:id'} element={<Order />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
