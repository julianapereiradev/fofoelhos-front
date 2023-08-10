import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import { headersAuth, pages, requisitions } from "../routes/routes";


export default function UpdateFormPage() {
    const { user, setUser} = useContext(AuthContext);
    const { id } = useParams();

  const [tables, setTables] = useState(undefined)
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

    axios.get(requisitions.getTables, headersAuth(user.token))
      .then(res => {
        setTables(res.data)
        console.log('res de getTables front:', res)
      })
      .catch(error => {
        alert(error.response.data);
        console.log('error de getTables front:', error)
      });


    axios.get(requisitions.getBunny + id, headersAuth(user.token))
      .then(resp => {
        setBunny(resp.data);
        setName(resp.data.name);
        setAge(resp.data.age)
        setDescription(resp.data.description)
        setUrl(resp.data.url)
        setSelectedBreed(resp.data.breedId)
        setSelectedSkinColor(resp.data.skinColorId)
        setSelectedSize(resp.data.sizeId)
        setActive(resp.data.active)
        console.log('resp de getBunny front', resp);
      })
      .catch(error => {
        alert(error.response.data);
        console.log('error de getBunny front', error)
        navigate(pages.home);
      });
      // eslint-disable-next-line
  }, [user]);

  console.log('tables aqui:', tables)
  console.log('bunnyId aqui:', bunny)


  function UpdateBunnyItem(e) {
    e.preventDefault();
    setDisable(true);

    const newBunnyUpdate = {
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
      .put(requisitions.updateBunny + id, newBunnyUpdate, headersAuth(user.token))
      .then((res) => {
        navigate(pages.myBunnies);
        setDisable(false);
        console.log("res do UpdateBunnyItem na UpdateFormPage front", res)
      })
      .catch((error) => {
        console.log('error de UpdateBunnyItem na UpdateFormPage:', error)
        alert(error.response.data);
        setDisable(false);
      });
  }

  return (
    <>
      <UpdateFormPageContainer>
        <UpdateFormPageTag onSubmit={UpdateBunnyItem}>
        <h1>Atualize os dados do seu orelhudinho</h1>
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
        </UpdateFormPageTag>
      </UpdateFormPageContainer>
    </>
  );
}

const UpdateFormPageContainer = styled.div`
  /* border: 3px solid red; */
`;

const UpdateFormPageTag = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;