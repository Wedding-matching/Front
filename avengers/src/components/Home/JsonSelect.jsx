import styled from "styled-components";
import { useState } from "react";
import FileImg from "../../assets/FileImg.svg";
const JsonSelect = () => {
    const [JsonSelectData, setJsonSelectData] = useState(null);
    
    const mockJsonData = [
        { id: "wellcome1st", typename: "JSON"},
        { id: "wellcome2st", typename: "JSON"},
        { id: "qoll", typename: "JSON"},
    ]
    return (
        <JsonSelectWrap>
            <JsonTitle><img src={FileImg}/>JSON 파일 선택</JsonTitle>
            <JsonDesc>검색할 JSON 파일을 선택하세요 (중복 선택 가능)</JsonDesc>
            <JsonListWrap>
                {mockJsonData.map((data) => (
                    <JsonItem key={data.id}>
                        <JsonImg src={FileImg}/>
                        <JsonName>{data.id}</JsonName>
                        <JsonType>{data.typename}</JsonType>
                    </JsonItem>
                ))}
                <JsonItem />
            </JsonListWrap>
        </JsonSelectWrap>
    );
        
}

export default JsonSelect;

const JsonSelectWrap = styled.div`
    border: 1px solid #0000001A;
    background: #FFFFFF;
    border-radius: 14px;
    padding: 25px 25px 50px 25px;
    width: 100%;
    height: fit-content;
`;

const JsonTitle = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;

    > img{
        width: 24px;
        height: 24px;
    }
    
    font-size: 20px;
    font-weight: 500;
    font-family: 'Pretendard';
    color: #0A0A0A;
    
`;

const JsonDesc = styled.div`
    font-size: 20px;
    font-weight: 400;
    font-family: 'Pretendard';
    color: #717182;

    margin-bottom: 40.67px;
`;

const JsonListWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    column-gap: 46px; /*좌우 간격*/
    row-gap: 42px; /*상하 간격*/
    justify-items: center;
`;

const JsonItemStyle = `
    width: 188px;
    height: 176px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid #0000001A;
    border-radius: 10px;
`

const JsonItem = styled.div`
    ${JsonItemStyle};
    gap: 9px;
`;
const JsonName = styled.div`
    font-size: 18px;
    font-weight: 600;
    font-family: 'Pretendard';
    color: #393939ff;
`;
const JsonType = styled.div`
    font-size: 13px;
    font-weight: 400;
    color: #717182;
`;

const JsonImg = styled.img`
    width: 64px;
    height: 64px;
    padding: 16px;
    background: #F3F3F5;
    border-radius: 10px;
    img {
        width: 42px;
        height: 42px;
    }
`;

const JsonItemPlus = styled.div`
    ${JsonItemStyle};
    font-size: 48px;
    font-weight: 400;
    color: #717182;
`;