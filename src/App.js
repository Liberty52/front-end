import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./screen/Main";
import Login from "./auth/login/Login";
import SignUp from "./auth/signUp/SignUp";
import Find from "./auth/find/Find";
import MyInfo from "./myInfo/MyInfo";
import Redirect from "./auth/Redirect/Redirect";
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
        <Route path={"/redirect"} element={<Redirect />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
