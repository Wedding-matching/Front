import styled from "styled-components";
import { useState } from "react";
import { useAskQuery } from "../../api/search";

import searchIcon from "../../assets/searchIcon.svg";
import SearchBtnImg from "../../assets/SearchBtn.svg";
import SearchHistory from "./SearchHistory";

const Search = ({ onSearch }) => {
    const { post } = useAskQuery(); //useAskQuery()를 실행하면 post-> 실제 api 요청 함수, loading-> 요청 중인지, error->에러가 발생했는지 상태를 제공
    const [question, setQuestion] = useState("");
    

    const handleSearch = async() => { //버튼 눌렀을 때
        try{ //post()안에 body를 넣어서 호출하면
            //axios.post("/ask", body)형태로 자동 호출됨
            const data = await post({
                query: question, //사용자 질문
                target_table: "wellcome1st",
            });
            console.log("API 응답 결과:", data);

            //부모(home)에게 데이터 전달 -> result가 받음
            onSearch(data);   //Home에게 검색어 전달

        }catch(err){
            console.log("API 요청 중 오류 :", err);
        }
    };

    return (
        <SearchWrap>
            <SearchTitle><img src={searchIcon}/>자연어 검색</SearchTitle>
            <SearchDescription>자연스러운 언어로 데이터를 검색하세요.</SearchDescription>

            <SearchInputWrap>
                <SearchInput
                    type="text"
                    placeholder="ex) 서울에 사는 남자"
                    value={question}
                    onChange={(e)=>setQuestion(e.target.value)}
                />
                <SearchBtn onClick={handleSearch}>
                    <img src={SearchBtnImg}/>검색
                </SearchBtn>
            </SearchInputWrap>

            <SearchExWrap>
                <SearchEx onClick={() => setQuestion("서울에 사는 남성")}>서울에 사는 남성</SearchEx>
                <SearchEx onClick={() => setQuestion("2000년생 서울 거주자")}>2000년생 서울 거주자</SearchEx>
                <SearchEx onClick={() => setQuestion("20대 흡연자")}>20대 흡연자</SearchEx>
                <SearchEx onClick={() => setQuestion("차량을 보유한 여성")}>차량을 보유한 여성</SearchEx>
                <SearchEx onClick={() => setQuestion("kt 이용자")}>kt 이용자</SearchEx>
                <SearchEx onClick={() => setQuestion("50대 미혼")}>50대 미혼</SearchEx>
            </SearchExWrap>

        </SearchWrap>
    );
};

export default Search;

const SearchWrap = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #0000001A;
    background: #FFFFFF;
    border-radius: 14px;
    padding: 24px;
    width: 100%;
`;

const SearchTitle = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;

    > img{
        width: 24px;
        height: 24px;
    }

    font-size: 20px;
    font-weight: 500;
    margin-bottom: 8px;
`;

const SearchDescription = styled.div`
    font-size: 20px;
    font-weight: 400;
    color: #717182;
    margin-bottom: 15.67px;
    margin-left: 35px;
`;

const SearchInputWrap = styled.div`
    display: flex;
    gap: 21.23px;
    margin-bottom: 20.67px;
    margin-left: 35px;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 65px;
    color: #000;
    font-size: 20px;
    padding: 12px 16px;
    background: #F3F3F5;
    border: 1px solid #00000000;
    border-radius: 8px;
`;

const SearchBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #838389ff;
    border: none;
    border-radius: 8px;

    > img{
        width: 20px;
        height: 20px;
    }
    
    padding : 15px 10px 14px 12px;
    color: #FFFFFF;
    font-size: 20px;
    white-space: nowrap;
`;

const SearchExTitle = styled.div`
    font-size: 20px;
    font-weight: 400;
    font-family: 'Pretendard';
    color: #4A5565;

    margin-bottom: 10px;
    margin-left: 35px;
`;

const SearchExWrap = styled.div`
    display: flex;
    gap: 8px;
    margin-left: 35px;

`;

const SearchEx = styled.span`
    background: #FFFFFF;
    padding: 7px 12px;
    border: 1px solid #0000001A;
    border-radius: 8px;

    color: #5d5d5dff;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Pretendard';
`;