import styled from "styled-components";
import { useState, useEffect } from "react";
import Title from "../components/Home/Title";
import Search from "../components/Home/Search";
import SearchHistory from "../components/Home/SearchHistory";
import Result from "../components/Home/Result";
import SearchDetail from "../components/Home/SearchDetail";
import Loading from "../components/Home/Loading";

const Home = () => {    
    // const [query, setQuery] = useState(""); //검색어
    const [searchResult, setSearchResult] = useState(null); //api결과 저장
    const [resultCount, setResultCount] = useState(0); //검색 결과 개수

    const [isLoading, setIsLoading] = useState(false); //로딩 상태
    const [loaddingProgress, setLoadingProgress] = useState(0); //로딩 프로그레스바 상태

    //검색 기록 모달
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalQuery, setModalQuery] = useState("");

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
                text: data.clean_query, //검색어 제목
                original: data.original_query,
                clean_query: data.clean_query,
                timestamp: Date.now(),
                results: data.result, //모달에서 다시 보여줄 데이터 저장
                count: data.metrics.final_count, //final_count 
                metrics: data.metrics, //추가: 메트릭스 전체 저장
            },
            ...prev //기존 기록 유지 + 위에 추가
        ]);
    };

    const handleDeleteHistory = (id) => {
        setHisrtoryList(prev => prev.filter(item => item.id !== id));
    };

    const openDetailModal = (item) => {
        setModalData(item.results); //searchDetail용 데이터
        setModalQuery(item.text); //searchDetail의 검색어
        setDetailModalOpen(true);
    }

    return (
        <HomeWrap>
            <TitleCell>
                <Title />
            </TitleCell>

            {/*Search가 API 결과 (data)를 넘겨주면 Home이 저장*/}
            <Search onSearch={handleSearch} setIsLoading={setIsLoading} setLoadingProgress={setLoadingProgress}/> 
            {/*lastestQuery - 가장 최근 검색한 검색어, lastestCount - 검색 결과 개수*/}
            <SearchHistory history={historyList} onDelete={handleDeleteHistory} onOpenDetail={openDetailModal}/>
            <ResultCell>
                    <Result 
                        data={searchResult} 
                        query={searchResult?.clean_query || ""} 
                        onCountUpdate={setResultCount}
                        isLoading={isLoading}/>
            </ResultCell>

            {detailModalOpen && (
                <ModalOverlay onClick={() => setDetailModalOpen(false)}>
                    <ModalBox onClick={(e)=>e.stopPropagation()}>
                        <SearchDetail 
                            results={modalData}
                            query={modalQuery}
                        />
                    </ModalBox>
                </ModalOverlay>
            )}
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


const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

const ModalBox = styled.div`
    width: 900px;
    height: 700px;
    background: #fff;
    border-radius: 12px;
    overflow-y: auto;
    padding: 20px;
`;