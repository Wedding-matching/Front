import styled from "styled-components";
import { useState } from "react";
import Title from "../components/Home/Title";
import Search from "../components/Home/Search";
import SearchHistory from "../components/Home/SearchHistory";
import Result from "../components/Home/Result";

const Home = () => {    
    const [query, setQuery] = useState(""); //검색어
    const [resultCount, setResultCount] = useState(0); //검색 결과 개수

    return (
        <HomeWrap>
            <TitleCell>
                <Title />
            </TitleCell>

            {/*검색어 전달*/}
            <Search onSearch={(q) => setQuery(q)}/> 
            {/*lastestQuery - 가장 최근 검색한 검색어, lastestCount - 검색 결과 개수*/}
            <SearchHistory lastQuery={query} lastestCount={resultCount}/>
            <ResultCell>
                    <Result query={query} onCountUpdate={setResultCount}/>
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
