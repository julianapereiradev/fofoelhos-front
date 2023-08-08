import styled from "styled-components";
import { pages, requisitions } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

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
        console.log('error de signUp:', error.response.data.message)
        alert(error.response.data.message);
        setDisable(false);
      });
  }

  return (
    <>
      <SingUpContainer>
        <SingUpBox onSubmit={SignUp}>
        <h1>Cadastro</h1>
          <input
            type="text"
            autoComplete="name"
            placeholder="Nome"
            required
            disabled={disable}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            placeholder="Telefone para contato"
            required
            disabled={disable}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

          <input
            type="password"
            placeholder="Confirmar senha"
            autoComplete="confirm-password"
            required
            disabled={disable}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" disabled={disable}>
            {disable ? (
              <ThreeDots
                type="ThreeDots"
                color="#ffffff"
                height={20}
                width={50}
              />
            ) : (
              "Criar Conta"
            )}
          </button>
        <Link to={`/login`}>Já tem uma conta? Entre agora!</Link>
        </SingUpBox>
      </SingUpContainer>
    </>
  );
}

const SingUpContainer = styled.div`
  /* border: 3px solid red; */
`;

const SingUpBox = styled.form`
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
