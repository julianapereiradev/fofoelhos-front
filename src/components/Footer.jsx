import styled from "styled-components";
import { pages } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Footer() {

  const { idUser, setIdUser} = useContext(AuthContext);

  const navigate = useNavigate();

  function goToHomePage() {
    navigate(pages.home);
  }

  function goToFormPage() {
    navigate(pages.formPage);
  }

  function goToFMyBunniesPage() {
    navigate(pages.myBunnies);
  }

  function goToMyUserPage() {
    navigate(pages.getUser + idUser.idUser);
  }



console.log('idUser no Footer', idUser)

  return (
      <DivFooter>

        <LinkFooter onClick={goToHomePage}>
        <ion-icon name="home"></ion-icon>
        </LinkFooter>

        <LinkFooter onClick={goToFormPage}>
        <ion-icon name="add-circle"></ion-icon>     
        </LinkFooter>

        <LinkFooter onClick={goToFMyBunniesPage}>
        <ion-icon name="heart"></ion-icon>
        </LinkFooter>

        <LinkFooter onClick={goToMyUserPage}>
        <ion-icon name="person-circle-outline"></ion-icon>
        </LinkFooter>
        
      </DivFooter>
  );
}

const DivFooter = styled.div`
  background-color: #babae7;;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const LinkFooter = styled.div`
 color:#ffffff;
 font-Size: 14px;
 text-decoration: none;
 font-size: 28px;
`;