import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../routes/routes";

export default function GetStarted() {

  const navigate = useNavigate();

  return (
    <GetStartedContainer>
      <GetStartedBox>
        <h1>Página de Início</h1>
        <button onClick={() => navigate(pages.signIn)}>Iniciar</button>
      </GetStartedBox>
    </GetStartedContainer>
  );
}

const GetStartedContainer = styled.div`
  /* height: 100vh; */
`;
const GetStartedBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
