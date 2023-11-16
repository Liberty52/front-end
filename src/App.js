import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './screen/main/Main';
import Login from './screen/login/Login';
import SignUp from './screen/login/signUp/SignUp';
import MyInfo from './screen/myInfo/MyInfo';
import Redirect from './screen/redirect/Redirect';
import Cart from './screen/cart/Cart';
import Order from './screen/order/Order';
import Payment from './screen/order/payment/Payment';
import ChangePassword from './screen/login/changePassword/ChangePassword';
import Inquiry from './screen/inquiry/Inquiry';
import Detail from './screen/inquiry/Detail';
import Provider from './Provider';
import './app.css';
import Editor from './screen/order/Editor';
import QuestionDetail from './screen/question/QuestionDetail';
import QuestionList from './screen/question/QuestionList';
import QuestionEditor from './screen/question/QuestionEditor';
import Support from './screen/support/Support';
import {
  MAIN,
  MY_INFO,
  LOGIN,
  SIGN_UP,
  REDIRECT,
  CART,
  CHOOSE,
  ORDER,
  PAYMENT,
  CHANGE_PASSWORD,
  INQUIRY,
  DETAIL,
  GUEST_DETAIL,
  EDITOR,
  SUPPORT,
  QUESTION,
  QUESTION_DETAIL,
  QUESTION_EDITOR,
  FAQ,
} from './constants/path';
import Faq from './screen/support/Faq';
import Choose from './screen/order/Choose';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.REACT_APP_GA_KEY);

export default function App() {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path={MAIN} element={<Main />} />
          <Route path={MY_INFO} element={<MyInfo />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={SIGN_UP} element={<SignUp />} />
          <Route path={REDIRECT} element={<Redirect />} />
          <Route path={CART} element={<Cart />} />
          <Route path={CHOOSE} element={<Choose />} />
          <Route path={ORDER} element={<Order />} />
          <Route path={PAYMENT} element={<Payment />} />
          <Route path={CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={INQUIRY} element={<Inquiry />} />
          <Route path={`${DETAIL}/:orderId`} element={<Detail />} />
          <Route path={`${GUEST_DETAIL}/:orderId`} element={<Detail />} />
          <Route path={EDITOR} element={<Editor />} />
          <Route path={QUESTION} element={<QuestionList />} />
          <Route path={`${QUESTION_DETAIL}/:id`} element={<QuestionDetail />} />
          <Route path={QUESTION_EDITOR} element={<QuestionEditor />} />
          <Route path={SUPPORT} element={<Support />} />
          <Route path={FAQ} element={<Faq />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
