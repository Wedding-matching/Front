import styled from "styled-components";
import resultIcon2 from "../../assets/resultIcon2.svg";
import SearchDetail from "./SearchDetail";

const Result = ({ query, onCountUpdate }) => {
    const noQuery = !query || query.trim() === "";

    return (
        <ResultWrap>
            <ResultTitle><img src={resultIcon2}/>검색 결과</ResultTitle>


            {noQuery ? (
                <ResultDetail>검색된 결과가 없습니다.</ResultDetail>
            ) : (
                <SearchDetail 
                    query={query} 
                    onCountUpdate={onCountUpdate}
                />
            )}
        </ResultWrap>
    );
};

export default Result;

const ResultWrap = styled.div`
    padding: 24px;
    border: 1px solid #0000001A;
    background: #FFFFFF;
    border-radius: 14px;
    min-height: 568px;
`;

const ResultTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    img{
        width: 20px;
        height: 20px;
    }

    font-size: 20px;
    font-weight: 500;
`;

const ResultDetail = styled.div`
    flex: 1;

    display: flex;
    justify-content: center;
    
    margin-top: 229px;


    font-size: 20px;
    color: #717182;
`;