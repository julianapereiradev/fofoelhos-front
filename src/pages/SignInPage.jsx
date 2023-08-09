import styled from "styled-components";
import { pages, requisitions } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import logoGetStarted from "../images/logoGetStarted.png";

export default function SignInPage() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  function SignIn(e) {
    e.preventDefault();
    setDisable(true);

    const login = { email: email, password: password };

    axios
      .post(requisitions.postSignIn, login)
      .then((res) => {
        const newUser = {
          token: res.data.token,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        navigate(pages.home);
        setDisable(false);
      })
      .catch((error) => {
        console.log("erro em SignIn:", error);
        alert(error.response.data.message);
        setDisable(false);
      });
  }

  return (
    <SingInContainer>
      <SingInBox onSubmit={SignIn}>
        <img src={logoGetStarted} />
        <div>
          <input
            type="email"
            autoComplete="email"
            placeholder="E-MAIL"
            required
            disabled={disable}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="SENHA"
            autoComplete="new-password"
            required
            disabled={disable}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

    <BoxButtons>
        <button type="submit" disabled={disable}>
          {disable ? (
            <ThreeDots
              type="ThreeDots"
              color="#ffffff"
              height={20}
              width={50}
            />
          ) : (
            "ENTRAR"
          )}
        </button>
        <LinkToSignUp to={`/cadastro`}>PRIMEIRA VEZ? CLIQUE AQUI</LinkToSignUp>
        </BoxButtons>
      </SingInBox>
    </SingInContainer>
  );
}

const SingInContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SingInBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  width: 100%;

  img {
    width: 200px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const BoxButtons = styled.div`
  /* border: 3px solid red; */
`;

export const LinkToSignUp = styled(Link)`
 color:  #ff995c;
 font-Size: 14px;
 text-decoration: none;
 font-size: 18px;
 border: 2px solid #ff995c;
 width: 80%;
 height: 45px;
 border-radius: 50px;
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 font-size: 12px;
 margin-top: 30px;
 font-weight: 700;
 letter-spacing: 1px;
`