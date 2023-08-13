import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../contexts/AuthContext";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { validateIdUser, validateUser } from "../constants/functions";
import BunnyHome from "../components/BunnyHome";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

export default function HomePage() {
  const navigate = useNavigate();

  const { user, setUser, idUser, setIdUser} = useContext(AuthContext);

  const [bunnies, setBunnies] = useState(undefined);

  useEffect(() => {
    validateUser(user, setUser);
    validateIdUser(idUser, setIdUser)

    axios
      .get(requisitions.getBunnies, headersAuth(user.token))
      .then((res) => {
        setBunnies(res.data);
        console.log("res de getBunnies front:", res);
      })
      .catch((error) => {
        navigate(pages.signIn);
        alert(error.response.data);
        console.log("error de getBunnies front:", error);
      });
      // eslint-disable-next-line
  }, [user]);

  console.log("tudo de bunnies aqui:", bunnies);

  if (!bunnies) {
    return <Loading />
   }


console.log('idUser', idUser)
console.log('user', user)

  return (
    <>
      <Header />

      <HomePageContainer>
      <h4>Clique abaixo em algum coelhinho(a) para contratar seus serviços</h4>
        <BunnyItemHomeBox>
          {bunnies ? (
            bunnies.map((item) => <BunnyHome key={item.id} item={item} />)
          ) : (
            <ThreeDots
              type="ThreeDots"
              color="#babae7"
              height={90}
              width={150}
            />
          )}
        </BunnyItemHomeBox>
      </HomePageContainer>

     <Footer />
    </>
  );
}


const HomePageContainer = styled.div`
  margin-top: 90px;
  margin-bottom: 70px;
  padding-bottom: 90px;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 500px;

  h4 {
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 2px;
    color: #8a8a8a;
    letter-spacing: 1px;
    padding-left: 10px;
    font-family: "Montserrat", sans-serif;
    text-align: center;
    padding-left: 10px;
  padding-right: 10px;
  }
`;

const BunnyItemHomeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;
