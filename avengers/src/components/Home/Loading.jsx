import styled, {keyframes} from "styled-components"
import { useState, useEffect } from "react";
import LoadingIcon from "../../assets/LoadingIcon.svg";
import ProgBar from "../Chart/ProgBar";

const Loading = () => {
    const [progress, setProgress] = useState(0);
    const barWidth = 800;

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => (prev >= 94 ? prev : prev + 0.2));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // X 위치 계산
    const xPos = (barWidth * (progress)) / 100;

    return (
        <LoadingWrap>
            <MovingImg 
                src={LoadingIcon} 
                style={{ "--x": `${xPos}px` }}
            />
            <ProgBar completed={progress} height="20px" width="800px" />
        </LoadingWrap>
    );
};

export default Loading;

// Y축 흔들림 애니메이션
const bounceY = keyframes`
  0%   { transform: translate(var(--x), 0px) scaleX(-1); }
  50%  { transform: translate(var(--x), -50px) scaleX(-1); }
  100% { transform: translate(var(--x), 0px) scaleX(-1); }
`;

const LoadingWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;   /* X=0 기준 */
    justify-content: center;
    gap: 50px;                 /* 이미지와 바 사이 간격 */
    width: 800px;
    margin: 80px auto;
`;

const MovingImg = styled.img`
    width: 150px;
    height: 150px;

    position: relative;        /* 절대X → 부모의 flex 정렬을 따르게 */
    animation: ${bounceY} 2s ease-in-out infinite;
`;