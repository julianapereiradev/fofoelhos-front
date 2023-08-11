import axios from "axios";
import styled from "styled-components";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser} = useContext(AuthContext);


  async function logout() {
    try {
      await axios.delete(requisitions.logout, headersAuth(user.token));
    } catch (error) {
      alert(error);
      console.log('Erro ao fazer logout', error)
    }

    localStorage.removeItem("user");
    setUser(0);
    navigate(pages.signIn);
  }

    return (
        <DivHeader>
        <p>FOFOELHOS AGENCY</p>
        <LinkLogout onClick={() => logout()}>
        <ion-icon name="chevron-forward-outline"></ion-icon>        </LinkLogout>
      </DivHeader>
    )
}

const DivHeader = styled.div`
  background-color: #ff995c;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  p {
    font-family: 'Pontano Sans', sans-serif;
    color: #ffffff;
    font-size: 20px;
    margin-left: 10px;
    letter-spacing: 1px;
    font-weight: 500;
  }
`;


const LinkLogout = styled.div`
 color: #ffffff;
 font-Size: 14px;
 text-decoration: none;
 font-size: 28px;
 margin-right: 10px;
`;