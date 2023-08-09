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
                <span><strong>Título: </strong>{bunny.name}</span>
                <span><strong>Descrição: </strong>{bunny.description}</span>
                <span><strong>Autor: </strong>{bunny.tutor}</span>
                <span><strong>Gênero: </strong>{bunny.age}</span>
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
  /* width: 100%;
  border: 1px solid #F6E4C4;
  color: #FFF;
  font-family: Inika, serif;
  font-size: 2.2vh;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 15px 0; */

  strong {
    font-weight: 700;
  }

  span {
    margin: 10px;
  }
`
