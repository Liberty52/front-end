import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/token';

export default function Redirect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    sessionStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    navigate('/', {
      replace: true,
    });
  }, []);
  return <></>;
}
