import styled from "styled-components"
import LoadingIcon from "../../assets/LoadingIcon.svg";
import ProgBar from "../Chart/ProgBar";
const Loading = ({progress}) => {
    return (
        <LoadingWrap>
            <img src={LoadingIcon} />
            <ProgBar completed={progress} height="20px" width="400px"/>
        </LoadingWrap>    

    )
}

export default Loading;

const LoadingWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;