import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import axios from 'axios';
import styled from 'styled-components';
import Events from '../../Components/Event/Events';
import NewsLettersSection from '../../Components/NewsLettersSection/NewsLettersSection';
import ActivitySection from '../../Components/ActivitySection/ActivitySection';
import ProgramsSection from '../../Components/ProgamsSection/ProgramsSection';
import TeamSection from '../../Components/TeamSection/TeamSection';
import Footer from '../../Components/Footer/Footer';

import './swiper-bundle.css';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Thumbs, Autoplay } from 'swiper';
// import './swiper-bundle.css';
// import './style.css';
SwiperCore.use([Navigation, Pagination, Thumbs, Autoplay]);

const Section1 = styled.div`
  display: flex;
  padding: 35px 45px;
  align-items: flex-end;
  background-image: url('${({ image }) => image}');
  background-size: cover;
  background-position : center;
  justify-content: flex-start;
  height: calc(100vh - 200px);
  & > div {
    width: 500px;
    font-size: 2rem;
    gap: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-weight: 700;
    color: rgb(38, 69, 38);
    p {
      text-align: justify;
    }
    div {
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
    }
  }
`;
const ButtonSection1 = styled.button`
  border-color: rgb(38, 69, 38);
  width: 130px;
  border-radius: 3px;
  border-width: 2px;
  color: ${({ filled }) => (filled ? 'white' : 'rgb(38, 69, 38)')};
  border-color: rgb(38, 69, 38);
  padding: 8px 20px;
  font-weight: 700;
  font-size: 0.7rem;
  background-color: ${({ filled }) =>
    filled ? 'rgb(38, 69, 38)' : 'transparent'};
`;

const Section2 = styled.div`
  display: flex;
  gap: 55px;
  /* width: 60vw; */
  overflow-x: hidden;
  align-self: center;
  padding: 25px 25px;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  font-weight: 700;
  color: rgb(38, 69, 38);
  & > img {
    width: 210px;
    height: 90px;
    object-fit: cover;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  const [mainSlides, setMainSlides] = useState(null);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    axios.get('https://adn-backend-mj63t.ondigitalocean.app/page/EN/homepage').then(res => {
      console.log(res.data.page);
      setData(res.data.page);
      setMainSlides(
        res.data.page.section2.partners.map((el, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={el.image} alt={'partner' + i} />
            </SwiperSlide>
          );
        })
      );
    });
  }, []);
  const swiper = useRef();
  if (data) {
    return (
      <Container>
        <NavBar />

        {/* first section begining */}
        <Section1 image={data.section1.image}>
          <div>
            <p>{data.section1.main}</p>
            <div>
              <ButtonSection1 filled={true}>
                {data.section1.buttons[0]}
              </ButtonSection1>
              <ButtonSection1>{data.section1.buttons[1]}</ButtonSection1>
            </div>
          </div>
        </Section1>

        {/* begining of section2 */}

        <Section2 ref={swiper}>
          <p className="section-2-title">{data.section2.main}</p>
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {data.section2.partners.map((el, i) => {
              return (
                <SwiperSlide key={i}>
                  <img
                    className="slider-partners"
                    src={el.image}
                    alt={'partner' + i}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Section2>

        <Events homeData={data.section3} />
        <NewsLettersSection Data={data.section4} />
        <ActivitySection Data={data.section5} />
        <ProgramsSection Data={data.section6} />
        <TeamSection Data={data.section7} />
        <Footer />
      </Container>
    );
  } else {
    return <div>loading</div>;
  }
};

export default Home;
