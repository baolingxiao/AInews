import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import AnalogClock from './AnalogClock';

const ClockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  height: 20px;
`;

const Label = styled.span`
  font-weight: 500;
  color: #666;
  min-width: 45px;
`;

const Time = styled.span`
  font-weight: 400;
  min-width: 65px;
`;

interface ClockProps {
  timezone: string;
  label: string;
}

const Clock: React.FC<ClockProps> = ({ timezone, label }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 获取指定时区的时间
  const getTimeInTimeZone = () => {
    return new Date(time.toLocaleString('en-US', { timeZone: timezone }));
  };

  const timeInZone = getTimeInTimeZone();
  const formattedTime = timeInZone.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <ClockContainer>
      <Label>{label}</Label>
      <Time>{formattedTime}</Time>
      <AnalogClock time={timeInZone} />
    </ClockContainer>
  );
};

export default Clock; 