import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './screen/Main';
import Login from './screen/auth/login/Login';
import SignUp from './screen/auth/signUp/SignUp';
import Find from './screen/auth/find/Find';
import MyInfo from './screen/auth/myInfo/MyInfo';
import Redirect from './screen/auth/redirect/Redirect';
import ChangePasswordPage from './screen/auth/redirect/ChangePasswordPage';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main />}></Route>
        <Route path={'/myInfo'} element={<MyInfo />}></Route>
        <Route path={'/login'} element={<Login />}></Route>
        <Route path={'/signUp'} element={<SignUp />}></Route>
        <Route path={'/find'} element={<Find />}></Route>
        <Route path={'/redirect'} element={<Redirect />}></Route>
        <Route path={'/auth/password'} element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
