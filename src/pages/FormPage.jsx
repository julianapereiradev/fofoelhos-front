import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { headersAuth, pages, requisitions } from "../routes/routes";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";


export default function FormPage() {
    const { user, setUser} = useContext(AuthContext);

  const [tables, setTables] = useState(undefined)
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

    axios.get(requisitions.getTables, headersAuth(user.token))
      .then(res => {
        setTables(res.data)
        console.log('res de getTables front:', res)
      })
      .catch(error => {
        alert(error.response.data);
        console.log('error de getTables front:', error)
      });
  }, [user]);

  console.log('tables aqui:', tables)



  function PostBunnyItem(e) {
    e.preventDefault();
    setDisable(true);

    const newBunnyPost = {
      name: name,
      age: age,
      description: description,
      breedId: selectedBreed,
      skinColorId: selectedSkinColor,
      sizeId: selectedSize,
      url: url,
      active: active
    };
    setDisable(true);

    axios
      .post(requisitions.postBunny, newBunnyPost, headersAuth(user.token))
      .then((res) => {
        navigate(pages.home);
        setDisable(false);
        console.log("res do PostBunnyItem na formPage front", res)
      })
      .catch((error) => {
        console.log('error de PostBunnyItem na formPage:', error)
        alert(error.response.data);
        setDisable(false);
      });
  }

  return (
    <>
      <FormPageContainer>
        <FormPageTag onSubmit={PostBunnyItem}>
        <h1>Registre seu orelhudinho</h1>
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
            type="text"
            autoComplete="age"
            placeholder="Idade"
            required
            disabled={disable}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

            <input
            type="text"
            autoComplete="description"
            placeholder="Descrição"
            required
            disabled={disable}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

            <input
            type="url"
            autoComplete="url"
            placeholder="Link da imagem do coelho"
            required
            disabled={disable}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

{tables ? (
<>

<label>Raça:</label>
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

<label>Cor do Pelo:</label>
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

  <label>Tamanho:</label>
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


          <div style={{display: 'flex', flexDirection: 'row'}}>
            <label>Ativo</label>
            <input
            type="radio"
            name="active"
            value={true}
            checked={active === true}
            onChange={() => setActive(true)}
            disabled={disable}
          />
            <label>Inativo</label>
            <input
            type="radio"
            name="active"
            value={false}
            checked={active === false}
            onChange={() => setActive(false)}
            disabled={disable}
          />
          </div>
          

          <button type="submit" disabled={disable}>
            {disable ? (
              <ThreeDots
                type="ThreeDots"
                color="#ffffff"
                height={20}
                width={50}
              />
            ) : (
              "Registrar"
            )}
          </button>
        </FormPageTag>
      </FormPageContainer>
    </>
  );
}

const FormPageContainer = styled.div`
  /* border: 3px solid red; */
`;

const FormPageTag = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;