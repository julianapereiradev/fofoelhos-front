import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { headersAuth, pages, requisitions } from "../routes/routes";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";

export default function FormPage() {
  const { user, setUser } = useContext(AuthContext);

  const [tables, setTables] = useState(undefined);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("1");
  const [selectedSkinColor, setSelectedSkinColor] = useState("1");
  const [selectedSize, setSelectedSize] = useState("1");
  const [url, setUrl] = useState("");
  const [active, setActive] = useState(true);
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    validateUser(user, setUser);

    axios
      .get(requisitions.getTables, headersAuth(user.token))
      .then((res) => {
        setTables(res.data);
        console.log("res de getTables front:", res);
      })
      .catch((error) => {
        alert(error.response.data);
        console.log("error de getTables front:", error);
      });
      // eslint-disable-next-line
  }, [user]);

  function goToHome() {
    navigate(pages.home);
  }

  function PostBunnyItem(e) {
    e.preventDefault();
    setDisable(true);

    if (selectedBreed === "1" || selectedBreed === 1) {
      return alert("Selecione uma raça");
    }

    if (selectedSkinColor === "1" || selectedSkinColor === 1) {
      return alert("Selecione uma cor de pêlo");
    }

    if (selectedSize === "1" || selectedSize === 1) {
      return alert("Selecione um tamanho");
    }

    const newBunnyPost = {
      name: name,
      age: age,
      description: description,
      breedId: selectedBreed,
      skinColorId: selectedSkinColor,
      sizeId: selectedSize,
      url: url,
      active: active,
    };
    setDisable(true);

    axios
      .post(requisitions.postBunny, newBunnyPost, headersAuth(user.token))
      .then((res) => {
        navigate(pages.home);
        setDisable(false);
        console.log("res do PostBunnyItem na formPage front", res);
      })
      .catch((error) => {
        console.log("error de PostBunnyItem na formPage:", error);
        alert(error.response.data);
        setDisable(false);
      });
  }

  return (
    <>
      <DivHeader>
        <LinkToHome onClick={goToHome}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </LinkToHome>
        <h1>REGISTRE O SEU ORELHUDINHO</h1>
      </DivHeader>

      <FormPageTag onSubmit={PostBunnyItem}>
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
          type="text"
          autoComplete="age"
          placeholder="IDADE"
          required
          disabled={disable}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          type="text"
          autoComplete="description"
          placeholder="DESCRIÇÃO"
          required
          disabled={disable}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="url"
          autoComplete="url"
          placeholder="LINK DA IMAGEM DO COELHO"
          required
          disabled={disable}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {tables ? (
          <>
            <select
              value={selectedBreed}
              onChange={(event) => setSelectedBreed(event.target.value)}
            >
              {tables.resultBreeds.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>

            <select
              value={selectedSkinColor}
              onChange={(event) => setSelectedSkinColor(event.target.value)}
            >
              {tables.resultSkinColors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>

            <select
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}
            >
              {tables.resultSizes.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </>
        ) : (
          <p>Carregando...</p>
        )}

        <ActiveDiv>
          <div>
            <label>STATUS:</label>
          </div>

          <div>
            <label>ATIVO</label>
            <input
              type="radio"
              name="active"
              value={true}
              checked={active === true}
              onChange={() => setActive(true)}
              disabled={disable}
            />
          </div>

          <div>
            <label>INATIVO</label>
            <input
              type="radio"
              name="active"
              value={false}
              checked={active === false}
              onChange={() => setActive(false)}
              disabled={disable}
            />
          </div>
        </ActiveDiv>

        <button type="submit" disabled={disable}>
          {disable ? (
            <ThreeDots
              type="ThreeDots"
              color="#ffffff"
              height={20}
              width={50}
            />
          ) : (
            "REGISTRAR"
          )}
        </button>
      </FormPageTag>
    </>
  );
}

const DivHeader = styled.div`
  background-color: #ff995c;
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
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    padding-right: 10px;
    letter-spacing: 1px;
  }

  ion-icon {
    height: 50px;
    font-size: 30px;
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
  color: #b46f45;
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
