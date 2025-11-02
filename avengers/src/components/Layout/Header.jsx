import styled from "styled-components";
import Logo from "../../assets/Logo.svg";

const Header = () => {
    return (
<HeaderWrap>
        <LogoImg src={Logo} />
        <HeaderName>Avengers.AI</HeaderName>
    </HeaderWrap>    
    )

}
export default Header;

const HeaderWrap = styled.div`
    height: 5.6875rem;
    background: #fffefe80;
    border: 1px solid #0000001A;

    display: flex;
    align-items: center;

    padding: 17px 46px;

    gap: 8px;
`

const HeaderName = styled.div`
    font-weight: 600;
    font-size: 20px;
    color: #0A0A0A;
`

const LogoImg = styled.img`
    width: 37px;
    height: 37px;
`