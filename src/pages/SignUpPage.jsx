import styled from "styled-components";
import { pages, requisitions } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import logoGetStarted from "../images/logoGetStarted.png"

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  function SignUp(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Confirmação de senha está incorreta!");
    }

    const newSignUp = {
      name: name,
      email: email,
      cpf: cpf,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
    };
    setDisable(true);

    axios
      .post(requisitions.postSignUp, newSignUp)
      .then((res) => {
        navigate(pages.signIn);
        setDisable(false);
      })
      .catch((error) => {
        console.log('error de signUp:', error)
        alert(error.response.data);
        setDisable(false);
      });
  }

  return (
    <>
      <SingUpContainer>
        <SingUpBox onSubmit={SignUp}>
        <img src={logoGetStarted} />
        <div>
          <input
            type="text"
            autoComplete="name"
            placeholder="NOME"
            required
            disabled={disable}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            type="text"
            autoComplete="cpf"
            placeholder="CPF"
            required
            disabled={disable}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
           <input
            type="text"
            autoComplete="phone"
            placeholder="TELEFONE DO TUTOR"
            required
            disabled={disable}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

          <input
            type="password"
            placeholder="CONFIRMAR SENHA"
            autoComplete="confirm-password"
            required
            disabled={disable}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            "CADASTRAR"
          )}
        </button>
        <LinkToSignIn to={`/login`}>JÁ TEM CADASTRO? CLIQUE AQUI</LinkToSignIn>
        </BoxButtons>
        </SingUpBox>
      </SingUpContainer>
    </>
  );
}

const SingUpContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SingUpBox = styled.form`
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

export const LinkToSignIn = styled(Link)`
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