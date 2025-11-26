import styled from "styled-components";
import { useEffect } from "react";
import turtle from "../../assets/turtle.svg";
import resultIcon from "../../assets/resultIcon.svg";
import SearchDetail from "./SearchDetail";
import Loading from "./Loading";


const Result = ({ data, query, onCountUpdate, isLoading }) => {
    const noData = !data || !Array.isArray(data.result);
    const total_time = data?.metrics?.total_time || null

    useEffect(()=>{
        if(!noData){ //검색 결과 개수는 data.result.length로 업데이트
        onCountUpdate(data.result.length);
        }
    }, [data, noData, onCountUpdate]);

    return (
        <ResultWrap>
            <ResultTitleWrap>
                <ResultTitle><img src={resultIcon}/>검색 결과</ResultTitle>
                {!isLoading && total_time &&(
                    <TimeWrap>
                        <img src ={turtle} style={{width: "20px", height: "20px"}}/>
                        <TotalTime>{total_time}</TotalTime>
                    </TimeWrap>
                )}
            </ResultTitleWrap>

            {isLoading ? (
                <Loading progress={0}/>
            ) : noData ? (
                <ResultDetail>검색된 결과가 없습니다.</ResultDetail>
            ) : (
                //api에서 받은 result 배열을 searchdetail에 전달
                <SearchDetail results={data.result} query={query}/>
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

const ResultTitleWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
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

const TimeWrap = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    background: #EFF6FF;
    padding: 4px 8px;
    border-radius: 8px;
`;

const TotalTime = styled.div`
    font-size: 10px;
    fontp-weight: 600;
`;