import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import { headersAuth, pages, requisitions } from "../routes/routes";
import Loading from "../components/Loading";

export default function UpdateFormPage() {
  const { user, setUser } = useContext(AuthContext);
  const { id } = useParams();

  const [tables, setTables] = useState(undefined);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("1");
  const [selectedSkinColor, setSelectedSkinColor] = useState("1");
  const [selectedSize, setSelectedSize] = useState("1");
  const [url, setUrl] = useState("");
  const [active, setActive] = useState(true);
  const [bunny, setBunny] = useState(undefined);
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

    axios
      .get(requisitions.getBunny + id, headersAuth(user.token))
      .then((resp) => {
        setBunny(resp.data);
        setName(resp.data.name);
        setAge(resp.data.age);
        setDescription(resp.data.description);
        setUrl(resp.data.url);
        setSelectedBreed(resp.data.breedId);
        setSelectedSkinColor(resp.data.skinColorId);
        setSelectedSize(resp.data.sizeId);
        setActive(resp.data.active);
        console.log("resp de getBunny front", resp);
      })
      .catch((error) => {
        alert(error.response.data);
        console.log("error de getBunny front", error);
        navigate(pages.home);
      });
    // eslint-disable-next-line
  }, [user]);

  console.log("tables aqui:", tables);
  console.log("bunnyId aqui:", bunny);

  function goToMyBunnies() {
    navigate(pages.myBunnies);
  }

  function UpdateBunnyItem(e) {
    e.preventDefault();
 
    if (selectedBreed === "1" || selectedBreed === 1) {
      return alert("Selecione uma raça");
    }

    if (selectedSkinColor === "1" || selectedSkinColor === 1) {
      return alert("Selecione uma cor de pêlo");
    }

    if (selectedSize === "1" || selectedSize === 1) {
      return alert("Selecione um tamanho");
    }

    const newBunnyUpdate = {
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
      .put(
        requisitions.updateBunny + id,
        newBunnyUpdate,
        headersAuth(user.token)
      )
      .then((res) => {
        navigate(pages.myBunnies);
        setDisable(false);
        console.log("res do UpdateBunnyItem na UpdateFormPage front", res);
      })
      .catch((error) => {
        console.log("error de UpdateBunnyItem na UpdateFormPage:", error);
        alert(error.response.data);
        setDisable(false);
      });
  }

  if (
    !tables ||
    !bunny ||
    !name ||
    !age ||
    !description ||
    !url ||
    !selectedBreed ||
    !selectedSkinColor ||
    !selectedSize
  ) {
    return <Loading />;
  }

  return (
    <>
      <DivHeader>
        <LinkToHome onClick={goToMyBunnies}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </LinkToHome>
        <h1>ATUALIZE O SEU ORELHUDINHO</h1>
      </DivHeader>

      <FormPageTag onSubmit={UpdateBunnyItem}>
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
          <LoadingButtonContent>
            {disable ? (
              <ThreeDots
                type="ThreeDots"
                color="#ff995c"
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
    font-size: 35px;
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

const LoadingButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
