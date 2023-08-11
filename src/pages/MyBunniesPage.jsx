import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import { headersAuth, pages, requisitions } from "../routes/routes";
import MyBunny from "../components/MyBunny";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

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

  async function logout() {
    try {
      await axios.delete(requisitions.logout, headersAuth(user.token));
    } catch (error) {
      alert(error);
      console.log("Erro ao fazer logout", error);
    }

    localStorage.removeItem("user");
    setUser(0);
    navigate(pages.signIn);
  }

  console.log("tudo de myBunnies aqui:", myBunnies);

  if (!myBunnies) {
    return <Loading />;
  }

  return (
    <>
      <DivHeader>
        <p>MEUS FILHOTES</p>
        <LinkLogout onClick={() => logout()}>
          <ion-icon name="chevron-forward-outline"></ion-icon>{" "}
        </LinkLogout>
      </DivHeader>

      <HomePageContainer>
        <BunnyItemHomeBox>
          {myBunnies ? (
            myBunnies.map((item) => <MyBunny key={item.id} item={item} />)
          ) : (
            <h1>Você ainda não tem coelhos cadastrados!</h1>
          )}
        </BunnyItemHomeBox>
      </HomePageContainer>

      <Footer />
    </>
  );
}

const DivHeader = styled.div`
  background-color: #FFFFFF;
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
  z-index: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  p {
    font-family: "Pontano Sans", sans-serif;
    color:#babae7;
    font-size: 20px;
    margin-left: 10px;
    letter-spacing: 1px;
    font-weight: 500;
  }
`;

const LinkLogout = styled.div`
  color:#babae7;
  font-size: 14px;
  text-decoration: none;
  font-size: 28px;
  margin-right: 10px;
`;

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

  h1 {
    color: #8a8a8a;
    font-weight: 500;
    font-size: 22px;
    text-align: center;
  }
`;
