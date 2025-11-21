import styled from "styled-components";
import FileBlue from "../../assets/FileBlue.svg";
import wellcome1st from "../../moidata/wellcome1st";
import download from "../../assets/download.svg";
import { useState, useEffect } from "react";

const SearchDetail = ({ query, onCountUpdate }) => {

    // 1) 자연어 파싱
    const gender =
        query.includes("남") ? "남" :
        query.includes("여") ? "여" : null;

    const location =
        query.includes("서울") ? "서울" :
        query.includes("부산") ? "부산" :
        query.includes("경기") ? "경기" : null;

    // 2) 데이터 필터링
    let results = wellcome1st;
    if (gender) results = results.filter(r => r["성별"] === gender);
    if (location) results = results.filter(r => r["거주지역"] === location);

    useEffect(()=>{ //결과 개수를 home으로 전달
        onCountUpdate(results.length);
    }, [results.length]);
    
    // 3) 선택된 row 저장
    const [selectedRows, setSelectedRows] = useState([]);

    // 행 클릭해서 선택/해제
    const toggleRow = (row) => {
        const isSelected = selectedRows.includes(row);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(r => r !== row));
        } else {
            setSelectedRows([...selectedRows, row]);
        }
    };

    // 4) TXT 다운로드 (선택된 row만)
    const downloadTXT = () => {
        const target = selectedRows.length > 0 ? selectedRows : [];

        if (target.length === 0) {
            alert("선택된 항목이 없습니다.");
            return;
        }

        let text = "";

        target.forEach(item => {
            text += `사용자 ID: ${item["사용자 ID"]}\n`;
            text += `성별: ${item["성별"]}\n`;
            text += `출생년도: ${item["출생년도"]}\n`;
            text += `거주지역: ${item["거주지역"]}\n`;
            text += `세부 거주지역: ${item["세부 거주지역"]}\n`;
            text += `-----------------------------\n`;
        });

        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "search_result.txt";
        link.click();
    };


    if (results.length === 0) {
        return (
            <NoResultWrap>조건과 일치하는 항목이 없습니다.</NoResultWrap>
        );
    }

    return (
        <SearchDetailWrap>

            <SearchDetailHead>
                <LeftWrap>
                    <img src={FileBlue}/>
                    <SD_H_Detail>
                        <SearchTitle>wellcome1st.js</SearchTitle>
                        <SearchNum>{results.length}개 일치 항목</SearchNum>
                    </SD_H_Detail>
                </LeftWrap>

                <TXTBtn onClick={downloadTXT}>
                    <img src={download}/>TXT 다운로드
                </TXTBtn>
            </SearchDetailHead>

            <TableWrap>
                <table>
                    <thead>
                        <tr>
                            <th>사용자 ID</th>
                            <th>성별</th>
                            <th>출생년도</th>
                            <th>거주지역</th>
                            <th>세부 거주지역</th>
                        </tr>
                    </thead>

                    <tbody>
                        {results.map((row, idx) => {
                            const isSelected = selectedRows.includes(row);

                            return (
                                <tr
                                    key={idx}
                                    onClick={() => toggleRow(row)}
                                    style={{
                                        background: isSelected ? "#DBEAFE" : "white",
                                        cursor: "pointer"
                                    }}
                                >
                                    <td>{row["사용자 ID"]}</td>
                                    <td>{row["성별"]}</td>
                                    <td>{row["출생년도"]}</td>
                                    <td>{row["거주지역"]}</td>
                                    <td>{row["세부 거주지역"]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableWrap>

        </SearchDetailWrap>
    );
};

export default SearchDetail;

const SearchDetailWrap = styled.div`
    width: 100%;
    background: #fff;
    border: 1px solid #0000001A; 
    margin-top: 20px;
    border-radius: 8px;
`;

const SearchDetailHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; /* TXT 버튼 오른쪽 끝 */
    padding: 14px;
    border-bottom: 1px solid #e5e5e5;
`;

const LeftWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    > img{
        background: #DBEAFE;
        padding: 8px;
        width: 32px;
        height: 32px;
        border-radius: 4px;
    }
`;

const SD_H_Detail = styled.div`
    display: flex;
    flex-direction: column;
`;

const SearchTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

const SearchNum = styled.div`
    font-size: 14px;
    color: #4A5565;
`;

const TableWrap = styled.div`
    padding: 16px;

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 10px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 14px;
        text-align: left;
    }

    th {
        background: #f9fafb;
        font-weight: 600;
    }
`;

const NoResultWrap = styled.div`
    padding: 30px;
    text-align: center;
    color: #717182;
    font-size: 18px;
`;

const TXTBtn = styled.div`
    display: flex;
    gap: 8px;
    background: #00000080;
    color: #fff;
    border-radius: 8px;
    padding: 8.52px 12px;
    cursor: pointer;

    img {
        width: 18px;
        height: 18px;
    }
`;