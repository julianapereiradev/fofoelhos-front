import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../routes/routes";
import logoGetStarted from "../images/logoGetStarted.png";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <PageNotFoundContainer>
      <img src={logoGetStarted} alt="Imagem do Logo" />
      <h1>Error</h1>
      <h1>404</h1>
      <Space>{""}</Space>
      <h2>Sinto muito, mas essa página</h2>
      <h2>não existe!</h2>
      <Space>{""}</Space>
      <button onClick={() => navigate(pages.signIn)}>VOLTAR PARA LOGIN</button>
    </PageNotFoundContainer>
  );
}

const PageNotFoundContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  max-width: 500px;
  height: 100vh;

  img {
    width: 200px;
    margin-bottom: 30px;
  }

  h1 {
    font-weight: 700;
    font-size: 50px;
    letter-spacing: 2px;
    color: #babae7;
    font-family: 'Sacramento', cursive;
  }

  h2 {
    color: #8a8a8a;
    font-weight: 500;
  }
`;

const Space = styled.div`
  margin-bottom: 30px;
`;