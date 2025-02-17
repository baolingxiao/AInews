import React from 'react';
import styled from '@emotion/styled';

const ClockSvg = styled.svg`
  width: 20px;
  height: 20px;
  margin-left: 4px;
  background-color: #f0f0f0;
  border-radius: 50%;
`;

const ClockFace = styled.circle`
  fill: #f0f0f0;
  stroke: #666;
  stroke-width: 1;
`;

const ClockHand = styled.line<{ angle: number }>`
  stroke: #333;
  stroke-width: ${props => props.angle % 360 === 0 ? '2' : '1.5'};
  stroke-linecap: round;
  transform-origin: center;
  transform: rotate(${props => props.angle}deg);
`;

interface AnalogClockProps {
  time: Date;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time }) => {
  // 计算时针和分针的角度
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  
  const hourDegrees = (hours * 30) + (minutes * 0.5); // 每小时30度，每分钟0.5度
  const minuteDegrees = minutes * 6; // 每分钟6度

  return (
    <ClockSvg viewBox="0 0 24 24">
      {/* 时钟外圈 */}
      <ClockFace cx="12" cy="12" r="11" />
      
      {/* 刻度 */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="2"
          x2="12"
          y2="3"
          stroke="#666"
          strokeWidth="1"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      
      {/* 时针 */}
      <ClockHand
        x1="12"
        y1="12"
        x2="12"
        y2="6"
        angle={hourDegrees}
      />
      
      {/* 分针 */}
      <ClockHand
        x1="12"
        y1="12"
        x2="12"
        y2="4"
        angle={minuteDegrees}
      />
      
      {/* 中心点 */}
      <circle
        cx="12"
        cy="12"
        r="1"
        fill="#333"
      />
    </ClockSvg>
  );
};

export default AnalogClock; 