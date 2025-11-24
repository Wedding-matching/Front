import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

const ProgBar = ({completed, width, height, progtext, progcheck}) =>{

    return (
            <ProgBarWrap>
                    <ProgressBar 
                        completed={completed} //진행률
                        maxCompleted={100} //완료값
                        isLabelVisible={false} //내부 라벨 숨김
                        baseBgColor="#D1D1D1"
                        bgColor="#357d39ff"
                        height={height || "20px"}
                        width={width || "1009px"}
                        progtext = {progtext}
                        progcheck = {progcheck}
                    />
            </ProgBarWrap>
            )
}

export default ProgBar;

const ProgBarWrap = styled.div`
    
`;