import styled from "styled-components";
import { Link } from "react-router-dom";
import { pages } from "../routes/routes";
import { useNavigate } from "react-router-dom";

export default function Footer() {

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

  return (
      <DivFooter>

        <LinkFooter onClick={goToHomePage}>
          Home
        </LinkFooter>

        <LinkFooter onClick={goToFormPage}>
         Adicionar
        </LinkFooter>

        <LinkFooter onClick={goToFMyBunniesPage}>
          Meus Coelhos
        </LinkFooter>
        
      </DivFooter>
  );
}

const DivFooter = styled.div`
  background-color: #0044ff;
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
`;

const LinkFooter = styled.button`
 color: #ffffff;
 font-Size: 14px;
 text-decoration: none;
 font-size: 18px;
`;


// export const LinkFooter = styled(Link)`
//  color: #ffffff;
//  font-Size: 14px;
//  text-decoration: none;
//  font-size: 18px;
// `