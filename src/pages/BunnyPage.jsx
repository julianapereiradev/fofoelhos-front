import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import { headersAuth, pages, requisitions } from "../routes/routes";
import Loading from "../components/Loading";

export default function BunnyPage() {
  const { user, setUser } = useContext(AuthContext);
  const [bunny, setBunny] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    validateUser(user, setUser);

    axios
      .get(requisitions.getBunny + id, headersAuth(user.token))
      .then((resp) => {
        setBunny(resp.data);
        console.log("resp de getBunny front", resp);
      })
      .catch((error) => {
        alert(error.response.data);
        console.log("error de getBunny front", error);
        navigate(pages.home);
      });
    // eslint-disable-next-line
  }, [user]);

  function redirectWhatsApp() {
    console.log(bunny.phone);
    const resposta = `Olá, segue as informações abaixo do orelhudinho que você solicitou o serviço. 
    As informações abaixo serão passadas para que o tutor possa dar continuidade com o processo de pagamento no privado.
    \n- Nome: ${bunny.name} \n - Idade: ${bunny.age}  \n - Raça: ${bunny.breed}  \n - Cor: ${bunny.skinColor}  \n - Tamanho: ${bunny.size}  \n - Tutor: ${bunny.dono}`;

    const texto = window.encodeURIComponent(resposta);

    window.open(`https://wa.me/55${bunny.phone}?text=${texto}`);
  }

  function goToHome() {
    navigate(pages.home);
  }

  if (!bunny) {
    return <Loading />;
  }

  return (
    <>
      <BunnyContainer>
        {bunny ? (
          <>
            <LinkToHome onClick={goToHome}>
              <ion-icon name="chevron-back-outline"></ion-icon>
            </LinkToHome>
            <img src={bunny.url} alt="Imagem do Coelho" />
            <DivForInfos>
              <FirstDiv>
                <h1>{bunny.name}</h1>
                <h2>{bunny.age}</h2>
              </FirstDiv>

              <SecondDiv>
                <ion-icon name="checkmark-done-outline"></ion-icon>
                <p>{bunny.breed}</p>
              </SecondDiv>

              <ThirdDiv>
                <div>
                  <p>Cor</p>
                  <h3>{bunny.skinColor}</h3>
                </div>

                <div>
                  <p>Tamanho</p>
                  <h3>{bunny.size}</h3>
                </div>
              </ThirdDiv>

              <FourthDiv>
                <FourthSubDiv>
                  <ion-icon name="person-circle-outline"></ion-icon>
                  <div>
                    <h2>{bunny.dono}</h2>
                    <p>Tutor(a)</p>
                  </div>
                </FourthSubDiv>
              </FourthDiv>

              <FifthDiv>
                <h2>DESCRIÇÃO:</h2>
                <p>{bunny.description}</p>
              </FifthDiv>

              <button onClick={redirectWhatsApp}>CONTRATAR</button>
            </DivForInfos>
          </>
        ) : (
          <ThreeDots type="ThreeDots" color="#babae7" height={90} width={150} />
        )}
      </BunnyContainer>
    </>
  );
}

const LinkToHome = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 3;

  ion-icon {
    font-size: 22px;
    color: #ffffff;
  }

  /* Estilos para criar o círculo */
  background-color: #babae7;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BunnyContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;

  img {
    width: 100%;
    object-fit: cover;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
  }
`;

const DivForInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  color: #8a8a8a;

  /* span {
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
    color: #8a8a8a;
  } */

  button {
    margin-top: 30px;
  }
`;

const FirstDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  h1 {
    font-size: 60px;
    font-family: "Sacramento", cursive;
    margin-right: 10px;
    text-align: left;
  }

  h2 {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
  }
`;

const SecondDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ion-icon {
    font-size: 22px;
    margin-right: 5px;
  }
`;

const ThirdDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ebebeb;
    width: 145px;
    height: 80px;
    text-align: center;
    border-radius: 10px;

    p {
      font-size: 12px;
      margin-bottom: 4px;
    }

    h3 {
      font-size: 14px;
      font-weight: 700;
    }
  }
`;

const FourthDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid #ededf1;

  ion-icon {
    color: #babae7;
    font-size: 30px;
    padding-right: 3px;
  }
`;

const FourthSubDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ion-icon {
    font-size: 70px;
    margin-right: 5px;
    color: #cac9c9;
  }

  div {
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 16px;
      font-weight: 600;
    }

    p {
      margin-top: 3px;
      font-size: 12px;
    }
  }
`;

const FifthDiv = styled.div`
  margin-top: 30px;

  h2 {
    font-weight: 700;
    letter-spacing: 2px;
  }

  p {
    padding-left: 10px;
    margin-top: 5px;
  }
`;
