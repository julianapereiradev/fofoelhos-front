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
        setMyBunnies(res.data);
        console.log("res de getMyBunnies front:", res.data);
      })
      .catch((error) => {
        navigate(pages.home);
        alert(error.response.data);
        console.log("error de getMyBunnies front:", error);
      });
    // eslint-disable-next-line
  }, [user]);

  async function logout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) {
      return;
    }
    
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

  if (myBunnies === undefined) {
    return <Loading />;
  }

  return (
    <>
      <DivHeader>
        <p>Meus Filhotes</p>
        <LinkLogout onClick={() => logout()}>
        <ion-icon name="log-out-outline"></ion-icon>
        </LinkLogout>
      </DivHeader>

      <HomePageContainer>
        <h4>Clique abaixo em algum dos seus orelhudinhos(as) para atualizar seus dados</h4>
        <BunnyItemHomeBox>
          {myBunnies.id !== null ? (
            myBunnies.map((item) => <MyBunny key={item.id} item={item} />)
          ) : (
            <h1>Ops, você não tem coelhos cadastrados!</h1>
          )}
        </BunnyItemHomeBox>
      </HomePageContainer>

      <Footer />
    </>
  );
}

const DivHeader = styled.div`
  background-color: #babae7;
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
    font-family: "Sacramento", cursive;
    color: #ffffff;
    font-size: 30px;
    margin-left: 10px;
    letter-spacing: 1px;
    font-weight: 600;
  }
`;

const LinkLogout = styled.div`
  color: #ffffff;
  font-size: 14px;
  text-decoration: none;
  font-size: 28px;
  margin-right: 10px;
`;

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

  h1 {
    font-weight: 500;
    font-size: 30px;
    letter-spacing: 2px;
    color: #8a8a8a;
    letter-spacing: 1px;
    text-align: center;
    font-family: "Montserrat", sans-serif;
  }
`;
