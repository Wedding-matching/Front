import styled from "styled-components";
import FileBlue from "../../assets/FileBlue.svg";
import download from "../../assets/download.svg";
import { useState } from "react";
import BubbleChart from "../Chart/BubbleChart";

const SearchDetail = ({ results, query }) => {
    // 선택된 row 저장
    const [selectedRows, setSelectedRows] = useState([]);

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    // 페이지별 데이터 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = results.slice(startIndex, endIndex);

    const totalPages = Math.ceil(results.length / itemsPerPage);

    // Row 클릭 토글
    const toggleRow = (row) => {
        const exists = selectedRows.includes(row);
        if (exists) {
            setSelectedRows(selectedRows.filter(r => r !== row));
        } else {
            setSelectedRows([...selectedRows, row]);
        }
    };

    const isPageAllSelected = currentItems.length > 0 
    && currentItems.every(row => selectedRows.includes(row));

const toggleSelectAllPage = () => {
    if (isPageAllSelected) {
        // 전체 해제
        setSelectedRows(prev => prev.filter(r => !currentItems.includes(r)));
    } else {
        // 전체 선택
        const newList = [...selectedRows];
        currentItems.forEach(row => {
            if (!newList.includes(row)) newList.push(row);
        });
        setSelectedRows(newList);
    }
};

    // TXT 다운로드
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

    // 결과 없을 때
    if (results.length === 0) {
        return <NoResultWrap>조건과 일치하는 항목이 없습니다.</NoResultWrap>;
    }

    return (
        <SearchDetailWrap>

            {/* 헤더 */}
            <SearchDetailHead>
                <LeftWrap>
                    <img src={FileBlue}/>
                    <SD_H_Detail>
                        <SearchTitle>{query}</SearchTitle>
                        <SearchNum>{results.length}개 일치 항목</SearchNum>
                    </SD_H_Detail>
                </LeftWrap>

                <BtnWrap>
                    <SelectAllBtn 
                        $active={isPageAllSelected}
                        onClick={toggleSelectAllPage}>
                        {isPageAllSelected ? "전체 해제" : "전체 선택"}
                    </SelectAllBtn>
                    <TXTBtn onClick={downloadTXT}>
                        <img src={download}/>TXT 다운로드
                    </TXTBtn>
                </BtnWrap>
            </SearchDetailHead>

            {/* 차트 영역 */}
            <SearchDetailChartWrap>
                <BubbleChart results={results}/>
            </SearchDetailChartWrap>

            {/* 테이블 */}
            <TableWrap>
                <table>
                    <thead>
                        <tr>
                            <th>사용자 ID</th>
                            <th>데이터</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.map((row, idx) => {
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
                                    <td>{row.info_text}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableWrap>

            {/* 페이지네이션 */}
            <PaginationWrap>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    이전
                </button>

                <span>{currentPage} / {totalPages}</span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    다음
                </button>
            </PaginationWrap>

        </SearchDetailWrap>
    );
};

export default SearchDetail;

/* ---------------- STYLE ---------------- */

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
    justify-content: space-between;
    padding: 14px;
`;

const LeftWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    > img {
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
const BtnWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SelectAllBtn = styled.div`
    background: ${props => props.$active ? "#cfcbcbff" : "#00000080"};
    color: white;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: 0.15s;
`

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

const SearchDetailChartWrap = styled.div`
    width: 100%;
    overflow: visible;
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 7px;
    height: 500px;
`;

const PaginationWrap = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 20px;

    button {
        padding: 6px 12px;
        background: #00000080;
        color: #fff;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        font-size: 14px;

        &:disabled {
            background: #cbd5e1;
            cursor: not-allowed;
        }
    }

    span {
        font-size: 14px;
        padding: 6px 12px;
    }
`;