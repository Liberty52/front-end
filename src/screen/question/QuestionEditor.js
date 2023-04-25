import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function QuestionEditor(){
  const location = useLocation();

  // useEffect(() => {
  //
  // },[])

  return <>
    <Header/>
    <h1>헬로우~</h1>
    <h2>{location.state.mode}</h2>
    <Footer/>
  </>
}