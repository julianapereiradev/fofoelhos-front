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
  }, [user])

  function redirectWhatsApp() {
    alert("Redirecionar para o WhatApp ao clicar")
  }

  return (
    <>
      <BunnyContainer>
{/* Colocar Header Depois */}
        {bunny ? (
          <BunnyBox>
            <img src={bunny.url} alt="Imagem do Coelho" />

            <InfoContainer>
              <BunnyInfo>
              <span><strong>Id do coelho: </strong>{bunny.id}</span>
                <span><strong>Nome: </strong>{bunny.name}</span>
                <span><strong>Descrição: </strong>{bunny.description}</span>
                <span><strong>Idade: </strong>{bunny.age}</span>
                <span><strong>Dono: </strong>{bunny.dono}</span>
                <span><strong>Telefone de contato do dono: </strong>COLOCAR</span>
                <span><strong>Raça: </strong>{bunny.breed}</span>
                <span><strong>Cor: </strong>{bunny.skinColor}</span>
                <span><strong>Tamanho: </strong>{bunny.size}</span>
                <span><strong>Status: </strong>{bunny.active === true ? ("Ativo") : ("Inativo")}</span>
              <button onClick={redirectWhatsApp}>CONTRATAR</button>
              </BunnyInfo>
            </InfoContainer>


          </BunnyBox>
        ) : (
          <ThreeDots type="ThreeDots" color="#ffffff" height={90} width={150} />
        )}
      </BunnyContainer>
    </>
  )
}

const BunnyContainer = styled.div`
  /* height: 100vh;
  margin-top: 70px;
  background-color: #1F1712;
  display: flex;
  justify-content: center;
  align-items: center; */
  border: 2px solid yellow;
`

const BunnyBox = styled.div`
  /* width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly; */

  img {
    width: 100px;
  }
`

const InfoContainer = styled.section`
  /* width: 57vw;
  height: 73vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; */
`

const BunnyInfo = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-weight: 700;
  }

  span {
    margin: 10px;
  }
`
