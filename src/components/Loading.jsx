import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <LoadingContainer>
      <h1>CARREGANDO</h1>
      <ThreeDots type="ThreeDots" color="#babae7" height={20} width={50} />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  max-width: 500px;
  height: 100vh;

  h1 {
    font-weight: 700;
    font-size: 30px;
    letter-spacing: 2px;
    color:#babae7;
    letter-spacing: 1px;
  }
`;