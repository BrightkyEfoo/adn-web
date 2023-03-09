import React, { useEffect, useState } from 'react';
import './style.css';
import NavBar from '../../Components/NavBar/NavBar';
import axios from 'axios';
import Section1 from '../../Components/Section1/Section1';
import FocalPointContainer from '../../Components/FocalPoints/FocalPointContainer';
import NewsLettersSection from '../../Components/NewsLettersSection/NewsLettersSection';
import Footer from '../../Components/Footer/Footer';
import Loader from '../../Components/Loader/Loader';

const About = () => {
  const [pageData, setPageData] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:9001/page/EN/aboutpage')
      .then(({ data }) => {
        console.log('data', data);
        setPageData(data.page);
      })
      .catch(err => console.log('err', err));
    axios
      .get('http://localhost:9001/page/EN/homepage')
      .then(res => {
        console.log(res.data.page);
        setData(res.data.page);
      })
      .catch(err => console.log('err', err));
  }, []);

  return pageData && data ? (
    <div className="about-page-container">
      <NavBar />
      <Section1 image={pageData.head.image} text={pageData.head.title} />

      <div className="about-page-section1">
        <div className="about-page-section1-sub-container">
          <div className="about-page-section1-left">
            <img src={pageData.section1.image} alt="" />
          </div>
          <div className="about-page-section1-right">
            <p className="about-page-section1-right-head">
              {pageData.section1.title}
            </p>
            <p className="about-page-section1-right-main">
              {pageData.section1.main}
            </p>
            <button className="about-page-section1-right-button">
              {pageData.section1.button.title}
            </button>
          </div>
        </div>
      </div>

      <div className="about-page-section2">
        <div className="about-page-section2-sub-container">
          <p className="about-page-section2-title">
            {pageData.section2.main.title}
          </p>
          <div className="about-page-section2-main">
            <div className="about-page-section2-main-left">
              {pageData.section2.main.text.map((el, i) => {
                return (
                  <p key={i + el.type} className={el.type === 'h' ? 'about-page-section2-title' : 'about-page-section2-main-left-p'}>
                    {el.value}
                  </p>
                );
              })}
            </div>
            <img
              className="about-page-section2-main-image"
              src={pageData.section2.image}
              alt=""
            />
          </div>
        </div>
      </div>

      <FocalPointContainer title={pageData.section3.title}/>
      <NewsLettersSection Data={data.section4} />
      <Footer />
    </div>
  ) : (
    <Loader/>
  );
};

export default About;
