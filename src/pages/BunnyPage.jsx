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
    const resposta = `Olá, segue as informações abaixo do orelhudinho que você contratou: \n- Nome: ${bunny.name} \n - Idade: ${bunny.age}  \n - Raça: ${bunny.breed}  \n - Cor: ${bunny.skinColor}  \n - Tamanho: ${bunny.size}  \n - Tutor: ${bunny.dono}`;

    const texto = window.encodeURIComponent(resposta);

    window.open(`https://wa.me/55${bunny.phone}?text=${texto}`);
  }

  function goToHome() {
    navigate(pages.home);
  }

  if (!bunny) {
    return <Loading />
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
              <span>
                <strong>NOME: </strong>
                {bunny.name}
              </span>
              <span>
                <strong>DESCRIÇÃO: </strong>
                {bunny.description}
              </span>
              <span>
                <strong>IDADE: </strong>
                {bunny.age}
              </span>
              <span>
                <strong>DONO: </strong>
                {bunny.dono}
              </span>
              <span>
                <strong>TELEFONE: </strong>
                {bunny.phone}
              </span>
              <span>
                <strong>RAÇA: </strong>
                {bunny.breed}
              </span>
              <span>
                <strong>COR: </strong>
                {bunny.skinColor}
              </span>
              <span>
                <strong>TAMANHO: </strong>
                {bunny.size}
              </span>
              <span>
                <strong>STATUS: </strong>
                {bunny.active === true ? "Ativo" : "Inativo"}
              </span>
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
  background-color:#babae7;
  width: 35px;
  height: 35px; 
  border-radius: 50%;
  display: flex;
  justify-content:center;
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
  }
`;
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
    color: #8a8a8a;
  }

  button {
    margin-top: 30px;
  }
`;
