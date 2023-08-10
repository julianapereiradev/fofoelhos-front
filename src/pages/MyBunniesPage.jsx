import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import { headersAuth, pages, requisitions } from "../routes/routes";
import MyBunny from "../components/MyBunny";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyBunniesPage() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const [myBunnies, setMyBunnies] = useState(undefined);

  useEffect(() => {
    validateUser(user, setUser);

    axios
      .get(requisitions.getMyBunnies, headersAuth(user.token))
      .then((res) => {
        setMyBunnies(res.data.resultMyBunnies);
        console.log("res de getMyBunnies front:", res);
      })
      .catch((error) => {
        navigate(pages.home);
        alert(error.response.data);
        console.log("error de getMyBunnies front:", error);
      });
      // eslint-disable-next-line
  }, [user]);

  console.log("tudo de myBunnies aqui:", myBunnies);

  return (
    <>
      <Header />

      <HomePageContainer>
        <BunnyItemHomeBox>
          {myBunnies ? (
            myBunnies.map((item) => <MyBunny key={item.id} item={item} />)
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
  padding-top: 50px;
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
