import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../contexts/AuthContext";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { validateUser } from "../constants/functions";
import BunnyHome from "../components/BunnyHome";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomePage() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const [bunnies, setBunnies] = useState(undefined);

  useEffect(() => {
    validateUser(user, setUser);

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

  return (
    <>
      <Header />

      <HomePageContainer>
        <BunnyItemHomeBox>
          {bunnies ? (
            bunnies.map((item) => <BunnyHome key={item.id} item={item} />)
          ) : (
            <ThreeDots
              type="ThreeDots"
              color="#ffffff"
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
  margin-top: 80px;
  margin-bottom: 70px;
  padding-bottom: 90px;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 500px;
`;

const BunnyItemHomeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;
