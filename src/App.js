import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { history } from "./components/shared/helper/history.js";

import Layout from "./layout/layout.js";

import Login from "./components/auth/login/login.js";
import Register from "./components/auth/register/register.js";
import { storeApp } from "./zustand/storeZustand.js";



function App() {

  history.navigate = useNavigate();
  history.location = useLocation();

  const auth = storeApp(state => state.auth)
  
  //const auth = true;
  if(auth){
    return <Layout/>;
  }else{
    return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to='login' />} />
      </Routes>
    );
  }
    
}

export default App;
