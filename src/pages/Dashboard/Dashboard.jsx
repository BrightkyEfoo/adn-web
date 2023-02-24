import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import SideBar from '../../Components/DashBoard/SideBar';
import MainDashBoard from '../../Components/DashBoard/MainDashBoard';
import './style.css'

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <div className='dashboard-super-container'>
        <SideBar />
        <MainDashBoard />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
