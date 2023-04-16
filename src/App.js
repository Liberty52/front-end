import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './screen/Main';
import Login from './screen/auth/login/Login';
import SignUp from './screen/auth/signUp/SignUp';
import MyInfo from './screen/auth/myInfo/MyInfo';
import Redirect from './screen/auth/redirect/Redirect';
import Purchase from './screen/shopping/purchase/Purchase';
import Cart from './screen/shopping/cart/Cart';
import Order from './screen/product/Order';
import ChangePasswordPage from './screen/auth/redirect/ChangePasswordPage';
import './app.css';
import Editor from './screen/product/Editor';
import Provider from './Provider';

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main />}></Route>
        <Route path={'/myInfo'} element={<MyInfo />}></Route>
        <Route path={'/login'} element={<Login />}></Route>
        <Route path={'/signUp'} element={<SignUp />}></Route>
        <Route path={'/redirect'} element={<Redirect />}></Route>
        <Route path={'/purchase'} element={<Purchase />}></Route>
        <Route path={'/cart'} element={<Cart />}></Route>
        <Route path={"/product/order"} element={<Order />}></Route>
        <Route path={'/product_speaker/:id'} element={<Order />}></Route>
        <Route path={'/product_speaker/:id/edit'} element={<Editor />} />
        <Route path={'/auth/password'} element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}
