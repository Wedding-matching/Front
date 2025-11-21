import styled from "styled-components";

const SearchTable = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <SearchTableWrap>
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
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row["사용자 ID"]}</td>
                            <td>{row["성별"]}</td>
                            <td>{row["출생년도"]}</td>
                            <td>{row["거주지역"]}</td>
                            <td>{row["세부 거주지역"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SearchTableWrap>
    );
};

export default SearchTable;

const SearchTableWrap = styled.div`
    margin-top: 20px;
    border: 1px solid #dfdfdf;
    border-radius: 8px;
    padding: 16px;

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 10px;
        border-bottom: 1px solid #e5e5e5;
        text-align: left;
        font-size: 14px;
    }

    th {
        background: #f9fafb;
        font-weight: 600;
    }
`;