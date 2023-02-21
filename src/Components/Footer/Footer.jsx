import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs'
import './style.css'

const Footer = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get('https://adn-backend-mj63t.ondigitalocean.app/footer/EN')
      .then(res => {
        setData(res.data.footer);
        console.log('res', res.data.footer);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  return data ? (
    <div className='footer-container'>
      <div className='footer-top'>
        <div className='footer-top-left'>
          <p>{data.left.head}</p>
          <p>{data.left.main}</p>
          <div className='footer-top-left-form'>
            <input  className='footer-top-left-form-input' type='email' placeholder={data.left.placeholder} />
            <button>{data.left.button}</button>
          </div>
        </div>
        <div className='footer-top-right'>
          {[data.right.links1, data.right.links2, data.right.links3].map(
            (el, i) => {
              return <div className='footer-top-right-part' key = {i}>{el.map((link, j) => {
                return <p key={i + '-' + j}>{link.text}</p>;
              })}</div>
            }
          )}
        </div>
      </div>
      <div className='footer-bottom'>
        <p className='footer-bottom-left'>{data.bottom.left}, Powered by <span className='dmservice'><a href="https://dmservices.cm/" target='_blank'>DMServices</a></span></p>
        <div className='footer-bottom-right'>
            <BsInstagram />
            <BsTwitter />
            <BsFacebook />
        </div>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default Footer;
