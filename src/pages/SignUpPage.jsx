import styled from "styled-components";
import { pages, requisitions } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import logoGetStarted from "../images/logoGetStarted.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      return (
        toast.error('Senhas incorretas', {
          position: "top-center",
          autoClose: 5000,
        })
      )
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
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
        });
        setDisable(false);
      });
  }

  return (
        <SingUpBox onSubmit={SignUp}>
        <ToastContainer position="top-center" autoClose={5000} />
        <img src={logoGetStarted} alt="Imagem do Logo"/>
        <h1>Cadastro</h1>
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
            maxLength="11"
          />
           <input
            type="text"
            autoComplete="phone"
            placeholder="DDD + TELEFONE"
            required
            disabled={disable}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength="11"
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
            "SEJA UM TUTOR"
          )}
          </LoadingButtonContent>
        </button>
        <LinkToSignIn to={`/login`}>JÁ TEM CADASTRO? CLIQUE AQUI</LinkToSignIn>
        </SingUpBox>
  );
}


const SingUpBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  max-width: 500px;
  height: 100vh;

  img {
    width: 200px;
    margin-bottom: 30px;
  }

h1 {
  font-family: 'Sacramento', cursive;
  color: #babae7;
  font-size: 45px;
  margin-bottom: 20px;
}

  button {
    margin-top: 40px;
  }
`;


export const LinkToSignIn = styled(Link)`
 color: #babae7;
 font-Size: 14px;
 text-decoration: none;
 font-size: 13px;
 border: 2px solid#babae7;
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