import styled from "styled-components"
import { pages, requisitions } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

export default function SignInPage() {

  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  function SignIn(e) {
    e.preventDefault();
    setDisable(true);

    const login = { email: email, password: password };

    axios.post(requisitions.postSignIn, login)
      .then((res) => {
        const newUser = {
          token: res.data.token
        }
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser))
        navigate(pages.home)
        setDisable(false)
      })
      .catch((error) => {
        console.log('erro em SignIn:', error)
        alert(error.response.data.message)
        setDisable(false)
      });
  }


  return (
    <>
    <SingInContainer>
          <SingInBox onSubmit={SignIn}>
          <h1>Login</h1>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="E-mail"
                  required
                  disabled={disable}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Senha"
                  autoComplete="new-password"
                  required
                  disabled={disable}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="submit"
                  disabled={disable}
                >
                  {disable ? (
                    <ThreeDots type="ThreeDots" color="#ffffff" height={20} width={50} />
                  ) : (
                    "Entrar"
                  )}
                </button>
          <Link to={`/cadastro`}>
        Primeira vez? Cadastre-se!
      </Link>
          </SingInBox>
    </SingInContainer>
    </>
  )
}

const SingInContainer = styled.div`
 /* border: 3px solid red; */
`

const SingInBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  input {
    /* width: 70%;
    height: 60px;
    margin-bottom: 20px;
    border-radius: 12px;
    border: 1px solid rgb(120, 177, 89, 25%);
    box-shadow: rgba(156, 156, 156, 0.2) 0px 7px 29px 0px;
    padding-left: 10px;
    font-weight: 500; */
  }

  button {
    /* margin-top: 50px;
    height: 60px;
    width: 200px;
    border-radius: 12px;
    border: none;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: #5D9040; */
  }
`;