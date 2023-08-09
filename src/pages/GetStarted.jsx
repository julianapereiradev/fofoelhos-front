import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../routes/routes";
import logoGetStarted from "../images/logoGetStarted.png";

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <GetStartedContainer>
      <GetStartedBox>
        <img src={logoGetStarted} />
        <div>
          <h1>Fofoelhos</h1>
          <h1>Agency</h1>
          <Space>{""}</Space>
          <h2>A sua agência nº 1 para contratar</h2>
          <h2>coelhos como modelos!</h2>
        </div>
        <button onClick={() => navigate(pages.signIn)}>INICIAR</button>
      </GetStartedBox>
    </GetStartedContainer>
  );
}

const GetStartedContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GetStartedBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;

  div {
    text-align: center;
  }

  h1 {
    font-weight: 700;
    font-size: 48px;
    letter-spacing: 2px;
    color: #ff995c;
  }

  h2 {
    color: #8a8a8a;
    font-weight: 500;
  }

  img {
    width: 200px;
  }
`;

const Space = styled.div`
  margin-bottom: 30px;
`;
