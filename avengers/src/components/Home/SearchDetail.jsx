import styled from "styled-components";
import FileBlue from "../../assets/FileBlue.svg";
// import wellcome1st from "../../moidata/wellcome1st";
import download from "../../assets/download.svg";
import { useState } from "react";

const SearchDetail = ({ results, query }) => {
    //클릭해서 선택한 row저장
    const [selectedRows, setSelectedRows] = useState([]);

    const toggleRow = (row) => { //행 클릭시 선택/해제
        const exists = selectedRows.includes(row);
        if(exists){
            setSelectedRows(selectedRows.filter(r => r !== row));
        }else {
            setSelectedRows([...selectedRows, row]);
        }

    };

    // 4) TXT 다운로드 (선택된 row만)
    const downloadTXT = () => {
        const target = selectedRows.length > 0 ? selectedRows : results;

        let text = "";
        target.forEach(item => {
            text += `\nID: ${item.id}\n`;
            text += `${item.info_text}\n`;
            text += `\n--------------------------------\n`;
        });

        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${query || "result"}_result.txt`;
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
                            {/* <th>성별</th>
                            <th>출생년도</th>
                            <th>거주지역</th>
                            <th>세부 거주지역</th> */}
                            <th>데이터</th>
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
                                    <td>{row.id}</td>
                                    {/* <td>{row["성별"]}</td>
                                    <td>{row["출생년도"]}</td>
                                    <td>{row["거주지역"]}</td>
                                    <td>{row["세부 거주지역"]}</td> */}
                                    <td>{row.info_text}</td>
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