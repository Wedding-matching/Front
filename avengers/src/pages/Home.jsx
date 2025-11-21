import styled from "styled-components";
import { useState, useEffect } from "react";
import Title from "../components/Home/Title";
import Search from "../components/Home/Search";
import SearchHistory from "../components/Home/SearchHistory";
import Result from "../components/Home/Result";

const Home = () => {    
    // const [query, setQuery] = useState(""); //검색어
    const [searchResult, setSearchResult] = useState(null); //api결과 저장
    const [resultCount, setResultCount] = useState(0); //검색 결과 개수

    //검색 기록 리스트 -> localStorage에서 초기 기록 불러오기
    const [historyList, setHisrtoryList] = useState(()=>{
        const saved = localStorage.getItem("searchHistory");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(()=>{ //historyList 바뀔 때마다 localStorage에 저장
        localStorage.setItem("searchHistory", JSON.stringify(historyList));
    }, [historyList]);

    const handleSearch = (data, query) => { //검색 실행 -> 기록 추가
        setSearchResult(data);

        setHisrtoryList(prev => [
            {
                id: Date.now(),
                text: query,
                timestamp: Date.now(),
                count: data.result.length,
            },
            ...prev //기존 기록 유지 + 위에 추가
        ]);
    };

    const handleDeleteHistory = (id) => {
        setHisrtoryList(prev => prev.filter(item => item.id !== id));
    };

    return (
        <HomeWrap>
            <TitleCell>
                <Title />
            </TitleCell>

            {/*Search가 API 결과 (data)를 넘겨주면 Home이 저장*/}
            <Search onSearch={handleSearch}/> 
            {/*lastestQuery - 가장 최근 검색한 검색어, lastestCount - 검색 결과 개수*/}
            <SearchHistory history={historyList} onDelete={handleDeleteHistory}/>
            <ResultCell>
                    <Result data={searchResult} query={searchResult?.clean_query || ""} onCountUpdate={setResultCount}/>
            </ResultCell>
        </HomeWrap>
    )
}
export default Home;

const HomeWrap = styled.div`
    margin: 63px 45px 51px 73px ;
    display: grid;
    /* 1행은 컨텐츠 높이, 2행은 남은 높이 전부 */
    grid-template-columns: fit-content(100%) auto;
    grid-template-rows: auto 1fr;
    column-gap: 26.67px;
    row-gap: 23.67px;
    /* 화면에서 아래까지는 차지하게 */
    min-height: calc(100vh - 63px - 51px);
`;

const TitleCell = styled.div`
    align-self: center;
    justify-self: center;
`;

const ResultCell = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    overflow: auto; /* 내용이 넘칠 때 스크롤 생성 */
`;
