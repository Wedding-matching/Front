import styled from "styled-components";
import History from "../../assets/History.svg";
import HistoryIcon from "../../assets/HistoryIcon.svg";
import HistoryTimeIcon  from "../../assets/HistoryTimeIcon.svg";
import Delete from "../../assets/Delete.svg";

//검색어 시간
const getTimeLabel = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);

    const diffMs = now - past;
    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
    }

    if (diffHours < 24) {
        return `${diffHours}시간 전`;
    }

    const month = past.getMonth() + 1;
    const date = past.getDate();

    return `${month < 10 ? "0" + month : month}.${date < 10 ? "0" + date : date}일`;
};

const SearchHistory = ({history, onDelete}) => {
    return (
        <SearchHistoryWrap>
            <SH_Title><img src={History} />Search History</SH_Title>
            <SH_Desc>최근 검색 기록</SH_Desc>

            {history.map(item => (
                <SH_ListWrap key={item.id}>
                    <SH_ListTitleWrap>
                        <img src={HistoryIcon} />
                        {/*검색어*/}
                        <SH_ListTitle>{item.text}</SH_ListTitle>
                    </SH_ListTitleWrap>

                    <SH_ListItemWrap>
                        <SH_ListDetailWrap>
                            <SH_ListTimeWrap>
                                <img src={HistoryTimeIcon} /> 
                                {/*검색 시간*/}
                                <SH_ListTime>{getTimeLabel(item.timestamp)}</SH_ListTime>
                            </SH_ListTimeWrap>
                            <SH_ListItemCount>{item.count}</SH_ListItemCount>
                        </SH_ListDetailWrap>

                        <SH_ListDelete>
                            <img src={Delete} onClick={()=>onDelete(item.id)}/>
                        </SH_ListDelete>
                    </SH_ListItemWrap>
                </SH_ListWrap>
                ))}                
        </SearchHistoryWrap>
    );
        
}

export default SearchHistory;

const SearchHistoryWrap = styled.div`
    border: 1px solid #0000001A;
    background: #FFFFFF;
    border-radius: 14px;
    padding: 24px 38px 47px 24px;
    width: 100%;
    height: 568px;
`;

const SH_Title = styled.div`
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

const SH_Desc = styled.div`
    font-size: 16px;
    font-weight: 400;
    font-family: 'Pretendard';
    color: #717182;

    margin-bottom: 12px;
    margin-left: 32.33px;
`;

const SH_ListWrap = styled.div`
    width: 399px;
    height: 66.5px;
    padding: 12.6px;
    display: flex;
    margin-left: 28px;
    flex-direction: column;
    gap: 2.47px;
    margin-bottom: 8px;
    border: 1px solid #E5E7EB;
    border-radius: 10px;

    overflow-y: auto; //세로 스크롤
`
const SH_ListTitleWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    >img{
        width: 12px;
        height: 12px;
    }
`;

const SH_ListTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
`;

const SH_ListItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    >img{
        width: 16px;
        height: 16px;
    }
`;

const SH_ListDetailWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const SH_ListTimeWrap = styled.div`
    display: flex;
    gap: 4px;
    margin-top: 1.91px;
    margin-left: 20.38px;
    align-items: center;
`;

const SH_ListDelete = styled.div`
    >img{
        width: 12px;
        height: 12px;
    }    
`;

const SH_ListTime = styled.div`
    font-size: 12px;
    font-weight: 400;
    color:#6A7282;
`;

const SH_ListItemCount = styled.div`
    font-size: 9px;
    font-weight: 500;
    color:#7B7B86;
    width: 19px;
    height: 19px;
    background: #ECEEF2;
    border-radius: 7px;

    display: flex;
    align-items: center;
    justify-content: center;
`