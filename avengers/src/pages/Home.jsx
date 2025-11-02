import styled from "styled-components";
import Title from "../components/Home/Title";
import Search from "../components/Home/Search";
import JsonSelect from "../components/Home/JsonSelect";
import Result from "../components/Home/Result";

const Home = () => {    
    return (
        <HomeWrap>
            <TitleCell>
                <Title />
            </TitleCell>
            <Search />
            <JsonSelect />
            <ResultCell>
                    <Result />
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
    column-gap: 26.67px; /*좌우 간격*/
    row-gap: 23.67px; /*상하 간격*/
    /* 화면에서 아래까지는 차지하게 */
    min-height: calc(100vh - 63px - 51px);
`;

const TitleCell = styled.div`
    align-self: center; /* 세로 중앙 정렬 */
    justify-self: center; /* 가로 중앙 정렬 */
`;

const ResultCell = styled.div`
    /*2행 높이 만큼 늘어남*/
    display: flex;
    flex-direction: column;
    align-self: stretch; /* 세로로 늘리기 */
    overflow: auto; /* 내용이 넘칠 때 스크롤 생성 */
`;
