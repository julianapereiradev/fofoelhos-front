import axios from "axios";
import styled from "styled-components";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser, idUser, setIdUser} = useContext(AuthContext);


  async function logout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(requisitions.logout, headersAuth(user.token));
    } catch (error) {
      alert(error);
      console.log('Erro ao fazer logout', error)
    }

    localStorage.removeItem("user");
    setUser(0);
    localStorage.removeItem("idUser");
    setIdUser(0)
    navigate(pages.signIn);
  }

    return (
        <DivHeader>
        <p>Fofoelhos Agency</p>
        <LinkLogout onClick={() => logout()}>
        <ion-icon name="log-out-outline"></ion-icon>       
        </LinkLogout>
      </DivHeader>
    )
}

const DivHeader = styled.div`
  background-color:#babae7;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  p {
    font-family: 'Sacramento', cursive;
    color:#ffffff;
    font-size: 30px;
    margin-left: 10px;
    letter-spacing: 1px;
    font-weight: 600;
  }
`;


const LinkLogout = styled.div`
 color:#ffffff;
 font-Size: 14px;
 text-decoration: none;
 font-size: 28px;
 margin-right: 10px;
`;