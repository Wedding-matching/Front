import styled from "styled-components";

const RoundChart = () => {
  const radius = 15; //원 반지름
  const circumference = 2 * Math.PI * radius; //원 둘레
  const percent = 7; //표시할 퍼센트 
  const progress = percent / 100; //0~1 값

  return (
    <>
        <svg viewBox="0 0 200 200">
        <circle
            cx="100" //x 중심 좌표
            cy="100" //y 중심 좌표
            r={radius} //반지름
            fill="none" //내부 채우기
            stroke="#E2F3FB" //배경 선 색
            strokeWidth="5" //선 두께
        />

        <AnimatedCircle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#44bed5" //진행될 색상
            strokeWidth="5"
            strokeDasharray={`${circumference * progress} ${
                            circumference * (1 - progress)
                        }`}         
            strokeDashoffset={circumference * (1 - progress)}
            circumference={circumference}
        />

        <text //중앙 텍스트
            x="100"
            y="103"
            textAnchor="middle"
            fontSize="7px"
            fill="#44bed5"
            fontWeight="600"
        >
            {`${percent}%`}
        </text>
      </svg>
    </>
  );
};
export default RoundChart;

const AnimatedCircle = styled.circle`
  animation: circle-fill-animation 2s ease;

  @keyframes circle-fill-animation {
    0% {
      stroke-dasharray: 0 ${2 * Math.PI * 90};
    }
  }
`;