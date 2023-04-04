import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Redirect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    localStorage.setItem("ACCESS_TOKEN", accessToken);
    localStorage.setItem("REFRESH_TOKEN", refreshToken);
    navigate("/", {
      replace: true,
    });
  }, []);
  return <></>;
}
