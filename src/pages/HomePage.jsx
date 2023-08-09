import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../contexts/AuthContext";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { validateUser } from "../constants/functions";
import BunnyHome from "../components/BunnyHome";

export default function HomePage() {

  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext)

  const [bunnies, setBunnies] = useState(undefined)

  useEffect(() => {

    validateUser(user, setUser);

    axios.get(requisitions.getBunnies, headersAuth(user.token))
      .then(res => {
        setBunnies(res.data)
        console.log('res de getBunnies front:', res)
      })
      .catch(error => {
        navigate(pages.signIn);
        alert(error.response.data);
        console.log('error de getBunnies front:', error)
      });
  }, [user]);

  function goToFormPage() {
    navigate(pages.formPage)
  }

console.log('tudo de bunnies aqui:', bunnies)

  return (
    <HomeContainer>
       {/*colocar depois um header  */}
       <h1>Página de Home</h1>
       <button onClick={goToFormPage}>+</button>
      <BunnyContainer>
        <Main>
          {bunnies ? (
            bunnies.map(item => <BunnyHome key={item.id} item={item}/>)
          ) : (
            <ThreeDots type="ThreeDots" color="#ffffff" height={90} width={150} />
          )}
        </Main>
      </BunnyContainer>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const BunnyContainer = styled.div`
  /* width: 100%; */
`

const Main = styled.div`
  /* border: 2px solid green */
`