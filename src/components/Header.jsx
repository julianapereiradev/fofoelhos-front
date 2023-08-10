import styled from "styled-components";

export default function Header() {

  function goToLogout() {
    // navigate(pages.home);
    alert("Fazer o logout aqui")
  }

    return (
        <DivHeader data-test="header">
        <p>Nome do tutor aqui</p>
        <LinkFooter onClick={goToLogout}>
        <ion-icon name="log-out-outline"></ion-icon>
        </LinkFooter>
      </DivHeader>
    )
}

const DivHeader = styled.div`
  background-color: #ff995c;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  p {
    font-family: 'Pontano Sans', sans-serif;
    color: #ffffff;
    font-size: 20px;
    margin-left: 10px;
  }
`;


const LinkFooter = styled.div`
 color: #ffffff;
 font-Size: 14px;
 text-decoration: none;
 font-size: 28px;
 margin-right: 10px;
`;