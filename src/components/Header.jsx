import styled from "styled-components";

export default function Header() {

    return (
        <DivHeader data-test="header">
        <p>Nome do tutor aqui</p>
        <button>Sair</button>
      </DivHeader>
    )
}

const DivHeader = styled.div`
  background-color: #ff0000;
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
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
  z-index: 1;

  p {
    font-family: 'Pontano Sans', sans-serif;
    color: #ffffff;
    font-size: 39px;
    margin-left: 10px;
  }

  img {
    width: 51px;
    height: 51px;
    border-radius: 100px;
    margin-right: 10px;
  }
`;