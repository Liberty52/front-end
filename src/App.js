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
import { FAQ, QUESTION, QUESTION_DETAIL, QUESTION_EDITOR, SUPPORT } from './constants/path';
import Faq from './screen/support/Faq';
import Choose from './screen/order/Choose';
import {useEffect} from "react";
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.REACT_APP_GA_KEY);

export default function App() {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

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
          <Route path={'/choose'} element={<Choose />} />
          <Route path={'/order'} element={<Order />} />
          <Route path={'/payment'} element={<Payment />} />
          <Route path={'/auth/password'} element={<ChangePassword />} />
          <Route path={'/inquiry'} element={<Inquiry />} />
          <Route path={'/detail/:orderId'} element={<Detail />} />
          <Route path={'/product/guest/:orderId'} element={<Detail />} />
          <Route path={'/editor'} element={<Editor />} />
          <Route path={QUESTION} element={<QuestionList />} />
          <Route path={QUESTION_DETAIL} element={<QuestionDetail />} />
          <Route path={QUESTION_EDITOR} element={<QuestionEditor />} />
          <Route path={SUPPORT} element={<Support />} />
          <Route path={FAQ} element={<Faq />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
