import styled from "styled-components";
const Footer = () => {
    return (
        <FooterWrap>
            &copy; 2025 AVENGERS. All rights reserved.
        </FooterWrap>
    )
}

export default Footer;

const FooterWrap = styled.div`
    background: #fffefe80;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #4A5565;
    font-size: 16px;
    font-weight: 400;

    width: 100%;
    height: 88.6px;
    font-family: 'Pretendard';
    border-top: 1px solid #0000001A;
`;
