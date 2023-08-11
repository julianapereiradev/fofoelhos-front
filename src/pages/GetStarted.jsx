import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../routes/routes";
import logoGetStarted from "../images/logoGetStarted.png";

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <GetStartedContainer>
      <img src={logoGetStarted} alt="Imagem do Logo" />
      <h1>Fofoelhos</h1>
      <h1>Agency</h1>
      <Space>{""}</Space>
      <h2>A sua agência nº 1 para contratar</h2>
      <h2>coelhos como modelos!</h2>
      <Space>{""}</Space>
      <button onClick={() => navigate(pages.signIn)}>INICIAR</button>
      <BottomText>Website inspired by Alena Yegorova layout</BottomText>
    </GetStartedContainer>
  );
}

const GetStartedContainer = styled.form`
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

const BottomText = styled.h4`
  position: absolute;
  bottom: 10px;
  left: 50%; 
  transform: translateX(-50%);
  color: #8a8a8a;
  font-weight: 300;
  font-size: 12px;
  text-align: center;
`;
