import styled from "styled-components";
import SearchIcon from "../../assets/SearchIcon.svg";
const Result = () => {
    return (
        <ResultWrap>
            <ResultTitle><img src={SearchIcon}/>검색 결과</ResultTitle>
            <ResultDetail>
                검색된 결과가 없습니다.
            </ResultDetail>
        </ResultWrap>
    );
}

export default Result;

const ResultWrap = styled.div`
    padding: 24px;
    border: 1px solid #0000001A;
    background: #FFFFFF;
    border-radius: 14px;

`;

const ResultTitle = styled.div`
    img{
            width: 20px;
            height: 20px;
        }

    font-size: 20px;
    font-weight: 500;
    font-family: 'Pretendard';

    gap: 8px;
    display: flex;
`;

const ResultDetail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    
    font-size: 20px;
    font-weight: 400;
    font-family: 'Pretendard';
    color: #717182;

`;