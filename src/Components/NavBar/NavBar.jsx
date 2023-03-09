import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { GrMenu, GrClose } from 'react-icons/gr';

const NavBar = () => {
  const navigate = useNavigate();
  const [isDisplayMenu, setIsDisplayMenu] = useState(false);

  const [isAboutDisplayed, setIsAboutDisplayed] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:9001/navbar/EN').then(res => {
      console.log(res.data.navBar);
      setData(res.data.navBar);
    });
  }, []);
  const isMobile = useMediaQuery({ query: '(max-width: 520px)' });
  if (data) {
    return (
      <div className="header-container">
        {/* first part of the header */}
        <div className="header-top">
          <div className="header-top-left">
            <button
              className="button-empty-border"
              onClick={() => navigate('/login')}
            >
              {data.section1[0]}
            </button>
            <button className="button-empty" onClick={() => navigate('/')}>
              {data.section1[1]}
            </button>
          </div>
          <div className="header-top-right">
            <a href={`mailto:${data.section2.email}`}>
              <button className="button-empty">{data.section2.email}</button>
            </a>
            <a href={data.section2.youtube}>
              <button className="button-empty">
                <FaYoutube />
              </button>
            </a>
            <a href={data.section2.twitter}>
              <button className="button-empty">
                <FaTwitter />
              </button>
            </a>
            <a href={data.section2.facebook}>
              <button className="button-empty">
                <FaFacebookF />
              </button>
            </a>
          </div>
        </div>

        {/* second part of the header */}

        <div className="header-bottom">
          <img
            className="header-logo"
            onClick={() => navigate('/')}
            src={data.logo}
            alt="logo"
          />
          {isMobile && (
            <button onClick={() => setIsDisplayMenu(prev => !prev)}>
              {isDisplayMenu ? <GrClose /> : <GrMenu />}
            </button>
          )}
          {!isMobile && (
            <div className="header-button-list">
              {data.links.map((link, i) => {
                if (link.title === 'About') {
                  console.log('link', link);
                  return (
                    <div
                      className="header-about-button-container"
                      key={i}
                      onClick={() => setIsAboutDisplayed(!isAboutDisplayed)}
                      // onMouseEnter={() => setIsAboutDisplayed(true)}
                      // onMouseLeave={() => setIsAboutDisplayed(false)}
                    >
                      {link.title}
                      {isAboutDisplayed && (
                        <div className="header-sub-about-button-container">
                          {link.subLinks?.map((subLink, j) => {
                            return (
                              <button
                                key={i + '-' + j}
                                onClick={j < 1 ? () => navigate(subLink.url) : null}
                              >
                                {subLink.title}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <button
                      onClick={i < 3 ? () => navigate(link.url) : null}
                      className={
                        isMobile ? 'button-mobile-1' : 'button-empty-color'
                      }
                      key={i}
                    >
                      {link.title}
                    </button>
                  );
                }
              })}
              <button className="button-empty-border-color">
                {data.button.title}
              </button>
            </div>
          )}
        </div>
        {isMobile && (
          <div className="header-button-list">
            {data.links.map((link, i) => {
              return (
                <button
                  onClick={() => navigate(link.url)}
                  className={
                    isMobile ? 'button-mobile-1' : 'button-empty-color'
                  }
                  key={i}
                >
                  {link.title}
                </button>
              );
            })}
            <button className="button-empty-border-color">
              {data.button.title}
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default NavBar;
