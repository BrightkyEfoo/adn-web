import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleChange = e =>{
    setForm(prev =>{
      let a = {...prev}
      a[e.target.name] = e.target.value
      return {...a}
    })
    // console.log('form', form)
  }

  const handleSubmit = e =>{
    axios.post('http://localhost:9001/user/login' , form).then(res => {
      console.log('res.data', res.data)
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('User' , JSON.stringify(res.data.user))
      navigate('/dashboard')
    }).catch(err => {
      console.log('err', err.response.data)
    })
    // 
  }

  // const [isPasswordVisible , setIsPasswordVisible] = useState(false)
  return (
    <div className="login-form-container">
      <p className="login-form-header">Welcome Back</p>
      <div className="login-form-input-container">
        <p className="login-form-input-container-label">Email</p>
        <input
          className="login-form-input-container-input"
          placeholder="type your email here"
          value={form.email}
          onChange={handleChange}
          type="email"
          name="email"
        />
      </div>
      <div className="login-form-input-container">
        <p className="login-form-input-container-label">Password</p>
        <input
          value={form.password}
          className="login-form-input-container-input"
          onChange={handleChange}
          placeholder="type your password here"
          type="password"
          name="password"
        />
      </div>
      <button
        className="login-form-submit"
        onClick={handleSubmit}
        type="button"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
