import React, { useEffect, useState } from 'react';
import './style.css';
import styled from 'styled-components';
const Right = styled.div`
    flex : 1;
    background-image : url("${({image})=>image}");
    background-size : cover;
    background-repeat : no-repeat;
    background-position : center;
    display : flex;
    jsutify-content : flex-start;
    align-items : flex-end;
    padding : 25px 45px;
    &>div{
        background-color : white;
        padding : 15px 25px;
        display : flex;
        flex-direction : column;
        gap : 15px;
        width : 450px;
        align-items : flex-start;
        justify-content : center;
        p{
            text-align : left
        }
        p.section4-right-head1{
            color : rgb(38, 69, 38);
            font-size : 1.6rem;
            font-weight : 700
        }
        p.section4-right-head2{
            font-size : 1rem
        }
        button {
            border-color : rgb(38, 69, 38);
            border-width : 1.5px;
            padding : 8px 35px;
            background-color : transparent
        }
    }
`
const NewsLettersSection = ({ Data }) => {
  const [data] = useState(Data);

  if (data) {
    return (
      <div className="newsletters-container">
        <div className="newsletters-left">
          <p>{data.left.main}</p>
          <div>
            <input type="email" placeholder={data.left.placeholder} />
            <button type="button">{data.left.button}</button>
          </div>
        </div>
        <Right image={data.right.image} className="newsletters-right">
          <div>
            <p className='section4-right-head1'>{data.right.title}</p>
            <p className='section4-right-head2'>{data.right.main}</p>
            <button type="button">{data.right.button}</button>
          </div>
        </Right>
      </div>
    );
  } else {
    return <div>NewsLettersSection</div>;
  }
};

export default NewsLettersSection;
