import React, { useState, useEffect } from 'react';

interface ClockProps {}

interface ClockState {
  hours: number;
  minutes: number;
  seconds: number;
}

const Clock: React.FC<ClockProps> = () => {
  const [time, setTime] = useState<ClockState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [newDate, setNewDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      const newDatePlusSecond = new Date(newDate.getTime() + 1000);
      setNewDate(newDatePlusSecond);

      setTime({
        hours: newDatePlusSecond.getHours() % 12,
        minutes: newDatePlusSecond.getMinutes(),
        seconds: newDatePlusSecond.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [newDate]);

  // fetch data
  useEffect(() => {
    const fetchDateTime = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        const { datetime } = await response.json();

        const dateObj = new Date(datetime);
        setNewDate(dateObj);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDateTime();
  }, []);

  const secondsStyle: React.CSSProperties = {
    transform: `translate(-100%, -100%) rotate(${time.seconds * 6}deg)`,
  };

  const minutesStyle: React.CSSProperties = {
    transform: `translate(-100%, -100%) rotate(${time.minutes * 6}deg)`,
  };

  const hoursStyle: React.CSSProperties = {
    transform: `translate(-100%, -100%) rotate(${time.hours * 30 + time.minutes / 2}deg)`,
  };

  return (
    <div className="clock">
      <div style={hoursStyle} className="clock__hand clock__hand--hour"></div>
      <div style={minutesStyle} className="clock__hand clock__hand--minute"></div>
      <div style={secondsStyle} className="clock__hand clock__hand--second"></div>
    </div>
  );
};

export default Clock;
