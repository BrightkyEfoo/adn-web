import React, { useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './style.css'
import { useDispatch } from 'react-redux';
import { NavBarActions } from '../../rtk/features/NavBarSlice';

const Login = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(NavBarActions.setIsLogin(true))
  }, [])
  
  return (
    <div>
      <NavBar />
      <div className='login-form-super-container'>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
