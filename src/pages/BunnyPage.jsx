import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner"
import AuthContext from "../contexts/AuthContext"
import { validateUser } from "../constants/functions"
import { headersAuth, pages, requisitions } from "../routes/routes"

export default function BunnyPage() {
  const { user, setUser } = useContext(AuthContext);
  const [bunny, setBunny] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    validateUser(user, setUser);

    axios.get(requisitions.getBunny + id, headersAuth(user.token))
      .then(resp => {
        setBunny(resp.data)
        console.log('resp de getBunny front', resp)
    })
      .catch(error => {
        alert(error.response.data);
        console.log('error de getBunny front', error)
        navigate(pages.home);
      });
      // eslint-disable-next-line
  }, [user])

  function redirectWhatsApp() {
    alert("Redirecionar para o WhatApp ao clicar")
  }

  function goToHome() {
    navigate(pages.home);
  }


  return (
    <>
      <DivHeader>
        <LinkToHome onClick={goToHome}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </LinkToHome>
        <h1>INFORMAÇÕES</h1>
      </DivHeader>

      <BunnyContainer>
        {bunny ? (
          <>
            <img src={bunny.url} alt="Imagem do Coelho" />
            <DivForInfos>
                <span><strong>NOME: </strong>{bunny.name}</span>
                <span><strong>DESCRIÇÃO: </strong>{bunny.description}</span>
                <span><strong>IDADE: </strong>{bunny.age}</span>
                <span><strong>DONO: </strong>{bunny.dono}</span>
                <span><strong>TELEFONE: </strong>{bunny.phone}</span>
                <span><strong>RAÇA: </strong>{bunny.breed}</span>
                <span><strong>COR: </strong>{bunny.skinColor}</span>
                <span><strong>TAMANHO: </strong>{bunny.size}</span>
                <span><strong>STATUS: </strong>{bunny.active === true ? ("Ativo") : ("Inativo")}</span>
              <button onClick={redirectWhatsApp}>CONTRATAR</button>
              </DivForInfos>
            </>
        ) : (
          <ThreeDots type="ThreeDots" color="#ffffff" height={90} width={150} />
        )}
      </BunnyContainer>
    </>
  )
}

const DivHeader = styled.div`
  background-color: #ff995c;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  h1 {
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    padding-right: 10px;
    letter-spacing: 1px;
  }

  ion-icon {
    height: 50px;
    font-size: 35px;
  }
`;

const LinkToHome = styled.div`
  color: #ffffff;
  font-size: 14px;
  text-decoration: none;
  font-size: 28px;
  margin-right: 10px;
`;

const BunnyContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  padding-top: 50px;
  max-width: 500px;

  img {
    width: 100%;
    object-fit: cover;
  }
`
const DivForInfos = styled.div`
 display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-radius: 25px;
  background-color: #fff4ee;
  position: relative;
  top: -20px;
  z-index: 2;
  padding: 20px;

  span {
    margin: 10px;
    letter-spacing: 1px;
    font-size: 20px;
    color: #8a8a8a;
    font-weight: 500;
  }

  strong {
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 16px;
    color: #b46f45;
  }

  button {
    margin-top: 30px;
  }
`;
