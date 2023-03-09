import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import styled from 'styled-components';
import { arrayUnion, ellipsis } from '../../helpers';
import './style.css';
import { useNavigate } from 'react-router-dom';
const Days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Container = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  height: 100%;
  gap: 1%;
  background-color: white;
  /* heig */
  
`;
const MainCalandar = styled.div`
  flex: 2;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 5px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align:start;
  padding: 5px;
 
  }
`;

const CalandarContext = createContext();

const Calandar = ({size}) => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth());
  const endDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const getDays = (year, month) => {
    const a = new Date(year, month, 0);
    // console.log(year, month);
    return a.getDate();
  };
  //   console.log(getDays(now.getFullYear(), now.getMonth()));
  const [calandarState, setCalandarState] = useState({
    numberOfDays: getDays(now.getFullYear(), now.getMonth() + 1),
    events: null,
    checkedDays: [],
  });

  const navigate = useNavigate();
  // useBe
  const [actualEvents, setActualEvents] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  useEffect(() => {
    axios
      .post('http://localhost:9001/event', {
        begin: firstDay.toISOString(),
        end: endDay.toISOString(),
      })
      .then(res => {
        // console.log('start');
        setCalandarState(prev => {
          let A = { ...prev, events: res.data.events };
          let b = { ...A };
          A.events.forEach((event, index) => {
            let begin = new Date(event.begin);
            let end = new Date(event.end);
            let a = [];
            let I = 0;
            for (I = begin.getDate(); I <= end.getDate(); I++) {
              a.push(I);
            }

            b = {
              ...b,
              checkedDays: arrayUnion(b.checkedDays, a),
            };
          });
          return b;
        });
      })
      .catch(err => console.log('err', err));
  }, []);
  // console.log('actualEvents[0]', actualEvents)

  return calandarState.events ? (
    <CalandarContext.Provider
      value={{ selectedDay, setSelectedDay, actualEvents, setActualEvents }}
    >
      <Container>
        <MainCalandar>
          {Array(firstDay.getDate() + 1)
            .fill(0)
            .map((e, i) => (
              <div key={i}></div>
            ))}
          {Array(calandarState.numberOfDays)
            .fill(0)
            .map((el, i) => {
              let a = new Date(now.getFullYear(), now.getMonth(), i + 1);
              // if()
              return (
                <DateBox
                  key={i}
                  date={a}
                  checked={calandarState.checkedDays.includes(a.getDate())}
                  now={now}
                />
              );
            })}
        </MainCalandar>
        <Left>
          {Array.isArray(actualEvents) && actualEvents.length ? (
            <>
              <div className="actual-event-title">
                EVENTS FOR {Months[now.getMonth()].toUpperCase()}
              </div>
              {size === 'big' && <img className='event-image' src={actualEvents[0].image} alt=''/>}
              <div className="actual-event-bottom">
                <p className="actual-event-bottom-title">
                  {new Date(actualEvents[0].begin).toDateString()}
                </p>
                <div className="actual-event-bottom-box">
                  <p className="actual-event-box-name">
                    {actualEvents[0].name}
                  </p>
                  {actualEvents[0].location.split('$br$').map((el, i) => (
                    <p className="actual-event-box-location" key={i}>
                      {el}
                    </p>
                  ))}
                  <p className="actual-event-box-main">
                    {ellipsis(90,actualEvents[0].main)}
                  </p>
                  <button
                    className="actual-event-box-button"
                    onClick={() => navigate('/events/' + actualEvents[0].id)}
                  >
                    More
                  </button>
                </div>
              </div>
            </>
          ) : Array.isArray(actualEvents) && actualEvents.length === 0 ? (
            <>
              <div className="actual-event-title">
                EVENTS FOR {Months[now.getMonth()].toUpperCase()}
              </div>
              <div className="actual-event-bottom">
                <p className="actual-event-bottom-title">
                  {now.toDateString()}
                </p>
                <div className="actual-event-bottom-box">
                  <p className="actual-event-box-name">No event Today !</p>
                </div>
              </div>
            </>
          ) : (
            null
          )}
        </Left>
      </Container>
    </CalandarContext.Provider>
  ) : null;
};

const DateContainerBox = styled.div`
  border: 2px #228922 solid;
  position: relative;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
`;

const EventCounter = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  /* padding: 0 5px; */
`;
const DayBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 5px;
`;
const DateDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 5px;
`;

const DateBox = ({ date, events, checked, now }) => {
  const toDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const toDayEnd = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
  const { selectedDay, setSelectedDay, actualEvents, setActualEvents } =
    useContext(CalandarContext);
  const handleClick = e => {
    if (selectedDay === date.getDate()) {
      setSelectedDay(0);
    } else {
      setSelectedDay(date.getDate());
      setActualEvents(null);
      // setActualEvents(prev => ({ ...prev, loading: true }));
      axios
        .post(`http://localhost:9001/event/actual`, {
          begin: toDay.toISOString(),
          end: toDayEnd.toISOString(),
        })
        .then(res => {
          console.log('event : ', res.data.events);
          setActualEvents(res.data.events);
        });
    }
  };

  useEffect(() => {
    if (date.getDate() === now.getDate()) {
      setActualEvents(null);
      // setActualEvents(prev => ({ ...prev, loading: true }));
      axios
        .post(`http://localhost:9001/event/actual`, {
          begin: toDay.toISOString(),
          end: toDayEnd.toISOString(),
        })
        .then(res => {
          console.log('event : ', res.data.events);
          setActualEvents(res.data.events);
        });
    }
  }, []);

  return (
    <DateContainerBox
      onClick={handleClick}
      bgColor={
        selectedDay === date.getDate()
          ? '#0080008a'
          : date.getDate() === now.getDate()
          ? '#0000ff69'
          : 'transparent'
      }
    >
      {checked && (
        <EventCounter>
          <GoPrimitiveDot
            color={selectedDay === date.getDate() ? 'white' : '#0080008a'}
          />
        </EventCounter>
      )}
      <DateDiv>{date.getDate()}</DateDiv>
      <DayBox>{Days[date.getDay()]}</DayBox>
    </DateContainerBox>
  );
};

export default Calandar;
