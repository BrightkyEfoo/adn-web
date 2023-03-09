import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import NewsLettersSection from '../../Components/NewsLettersSection/NewsLettersSection';
import Section1 from '../../Components/Section1/Section1';
import DoctorSmallCard from '../../Components/DoctorSmallCard/DoctorSmallCard';

const Vmv = () => {
  const [pageData, setPageData] = useState(null);
  const [data, setData] = useState(null);
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    axios
      .get('https://adn-backend-mj63t.ondigitalocean.app/view/?language=EN&name=doctoraboutpage')
      .then(({ data }) => {
        console.log('data', data);
        setPageData(data.view);
      })
      .catch(err => console.log('err', err));
    axios
      .get('https://adn-backend-mj63t.ondigitalocean.app/page/EN/homepage')
      .then(res => {
        console.log(res.data.page);
        setData(res.data.page);
      })
      .catch(err => console.log('err', err));

    axios
      .get('https://adn-backend-mj63t.ondigitalocean.app/user/doctor')
      .then(res => {
        console.log(res.data.doctors);
        setDoctors(res.data.doctors);
      })
      .catch(err => console.log('err', err));
  }, []);
  return (
    <div>
      <NavBar />
      {pageData && (
        <Section1
          image={pageData.content.image}
          text={pageData.content.title}
        />
      )}
      <div>
        {doctors && doctors.map((el, i) => <DoctorSmallCard key={i} data={el} button={pageData.content.button} />)}
      </div>
      {data && <NewsLettersSection Data={data.section4}  />}

      <Footer />
    </div>
  );
};

export default Vmv;
