import styled from "styled-components";
import Round from "../../assets/RoundTitleIcon.svg";

const Title = () => {
    return (
        <>
            <TitleWrap>
                <RoundTiTle><img src={Round}/>AI 기반 자연어 처리</RoundTiTle>
                <SubTitle>자연어로 소통하는 AI 플랫폼</SubTitle>
                <TitleDescription>JSON 파일을 선택하고 자연어로 데이터를 검색하세요.</TitleDescription>
            </TitleWrap>
        </>
    )
}
export default Title;

const TitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: fit-content;
    padding: 20px;
`

const RoundTiTle = styled.div`
    background-color: #DBEAFE;
    border-radius: 22369600px;
    padding: 8px 16px;
    gap: 8px;
    display: flex;

    color: #1447E6;
    font-size: 20px;
    font-weight: 400;
    font-family: 'Pretendard';
    text-align: center;
    margin-bottom: 27.67px;

    >img {
        width: 20px;
        height: 20px;
    }

    justify-content: center;
    align-items: center;

`;

// 글자에 그라데이션 주기
const gradientText = `
    background: linear-gradient(90deg, #155DFC, #9810FA);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const SubTitle = styled.div`
    ${gradientText};
    font-size: 20px;
    font-weight: 400;

    font-family: 'Pretendard';
    
    margin-bottom: 28.33px;
    white-space: nowrap;
`;

const TitleDescription = styled.div`
    font-size: 24px;
    font-weight: 400;
    font-family: 'Pretendard';

    color: #4A5565;
    white-space: nowrap;
`;