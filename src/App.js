import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './screen/Main';
import Login from './screen/auth/login/Login';
import SignUp from './screen/auth/signUp/SignUp';
import MyInfo from './screen/auth/myInfo/MyInfo';
import Redirect from './screen/auth/redirect/Redirect';
import Cart from './screen/cart/Cart';
import Order from './screen/product/Order';
import Payment from './screen/product/payment/Payment';
import ChangePasswordPage from './screen/auth/redirect/ChangePasswordPage';
import Inquiry from './screen/shopping/inquiry/Inquiry';
import Detail from './screen/shopping/detail/Detail';
import Provider from './Provider';
import './app.css';
import Editor from './screen/product/Editor';
import QuestionDetail from "./screen/question/QuestionDetail";
import QuestionList from "./screen/question/QuestionList";
import QuestionEditor from "./screen/question/QuestionEditor";

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'/myInfo'} element={<MyInfo />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signUp'} element={<SignUp />} />
          <Route path={'/redirect'} element={<Redirect />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path={'/order'} element={<Order />} />
          <Route path={'/payment'} element={<Payment />} />
          <Route path={'/auth/password'} element={<ChangePasswordPage />} />
          <Route path={'/inquiry'} element={<Inquiry />} />
          <Route path={'/detail/:orderId'} element={<Detail />} />
          <Route path={'/editor'} element={<Editor />} />
          <Route path={'/question'} element={<QuestionList />} />
          <Route path={'/question/:id'} element={<QuestionDetail />} />
          <Route path={'/question/editor'} element={<QuestionEditor />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
