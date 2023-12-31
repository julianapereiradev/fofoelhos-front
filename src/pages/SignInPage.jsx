import styled from "styled-components";
import { pages, requisitions } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import logoGetStarted from "../images/logoGetStarted.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function SignInPage() {
  const { setUser, idUser, setIdUser } = useContext(AuthContext);
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

        const newIdUser = {
          idUser: res.data.userId,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        setIdUser(newIdUser)
        localStorage.setItem("idUser", JSON.stringify(newIdUser));
        navigate(pages.home);
        setDisable(false);
        console.log(  'res de sign in AQUUII', res)
      })
      .catch((error) => {
        console.log("erro em SignIn:", error);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
        });
        setDisable(false);
      });
  }

  return (
      <SingInBox onSubmit={SignIn}>
      <ToastContainer position="top-center" autoClose={5000} />

        <img src={logoGetStarted} alt="Imagem do Logo"/>
        <h1>Login</h1>
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

        <button type="submit" disabled={disable}>
        <LoadingButtonContent>
          {disable ? (
            <ThreeDots
              type="ThreeDots"
              color="#babae7"
              height={20}
              width={50}
            />
          ) : (
            "ENTRAR"
          )}
           </LoadingButtonContent>
        </button>
        <LinkToSignUp to={`/cadastro`}>PRIMEIRA VEZ? CLIQUE AQUI</LinkToSignUp>
      </SingInBox>
  );
}



const SingInBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  max-width: 500px;
  height: 100vh;

  h1 {
  font-family: 'Sacramento', cursive;
  color: #babae7;
  font-size: 45px;
  margin-bottom: 20px;
}

  img {
    width: 200px;
    margin-bottom: 30px;
  }

  button {
    margin-top: 40px;
  }
`;


export const LinkToSignUp = styled(Link)`
 color: #babae7;
 font-Size: 14px;
 text-decoration: none;
 font-size: 13px;
 border: 2px solid #babae7;
 width: 100%;
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

const LoadingButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;