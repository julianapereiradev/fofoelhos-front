import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { headersAuth, pages, requisitions } from "../routes/routes";
import AuthContext from "../contexts/AuthContext";
import { validateIdUser, validateUser } from "../constants/functions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/Loading";
import { ThreeDots } from "react-loader-spinner";

export default function UserPage() {
  const { user, setUser, idUser, setIdUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    validateIdUser(idUser, setIdUser);
    validateUser(user, setUser);

    axios
      .get(requisitions.getUser + idUser.idUser, headersAuth(user.token))
      .then((response) => {
        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setPhone(response.data.phone);
        console.log("response em getUser", response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user, idUser]);

  function goToHomePage() {
    navigate(pages.home);
  }

  function UpdateBunnyItem(e) {
    e.preventDefault();

    const newBunnyUpdate = {
      name: name,
      email: email,
      cpf: cpf,
      phone: phone,
    };
    setDisable(true);

    axios
      .put(
        requisitions.updateUser + idUser.idUser,
        newBunnyUpdate,
        headersAuth(user.token)
      )
      .then((res) => {
        navigate(pages.home);
        setDisable(false);
        console.log("res do UpdateBunnyItem na UpdateFormPage front", res);
      })
      .catch((error) => {
        console.log("error de UpdateBunnyItem na UpdateFormPage:", error);
        toast.error(error.response.data, {
          position: "top-center",
          autoClose: 5000,
        });
        setDisable(false);
      });
  }

  if (!userData) {
    return <Loading />;
  }

  // console.log('idUser na página UserPage:', idUser)
  // console.log('idUser2 na página UserPage:', idUser.idUser)
  console.log("userData", userData);

  return (
    <>
      <DivHeader>
        <LinkToHome onClick={goToHomePage}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </LinkToHome>
        <h1>Atualizar dados</h1>
      </DivHeader>

      <FormPageTag onSubmit={UpdateBunnyItem}>
        <ToastContainer position="top-center" autoClose={5000} />
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
          placeholder="EMAIL"
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
          placeholder="Telefone"
          required
          disabled={disable}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
              "ATUALIZAR"
            )}
          </LoadingButtonContent>
        </button>
      </FormPageTag>
    </>
  );
}

const DivHeader = styled.div`
  background-color: #babae7;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  h1 {
    font-family: "Sacramento", cursive;
    color: #ffffff;
    font-size: 30px;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: 600;
  }
`;

const LinkToHome = styled.div`
  color: #ffffff;
  font-size: 14px;
  text-decoration: none;
  font-size: 28px;
  margin-right: 10px;
`;

const FormPageTag = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  padding-bottom: 50px;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 500px;
`;

const ActiveDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  padding: 0px 10px;
  letter-spacing: 1px;
  font-size: 13px;
  background-color: #ffffff;
  color: #8a8a8a;
  margin-bottom: 50px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }

  input {
    width: 22px;
  }
`;

const LoadingButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
