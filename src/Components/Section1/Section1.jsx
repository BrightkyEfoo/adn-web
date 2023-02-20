import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 65px 0 25px 0;
  background-image: Url('${({ image }) => image}');
  background-position: center;
  color:white;
  background-size: cover;
  width: 100%;
  p {
    font-size: 1.6em;
    font-weight: 700;
  }
`;

const Section1 = ({ image, text }) => {
  return (
    <Section image={image}>
      <p>{text}</p>
    </Section>
  );
};

export default Section1;
