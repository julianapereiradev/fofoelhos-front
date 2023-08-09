import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import { headersAuth, pages, requisitions } from "../routes/routes";
import MyBunny from "../components/MyBunny";

export default function MyBunniesPage() {

  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext)

  const [myBunnies, setMyBunnies] = useState(undefined)

  useEffect(() => {

    validateUser(user, setUser);

    axios.get(requisitions.getMyBunnies, headersAuth(user.token))
      .then(res => {
        setMyBunnies(res.data.resultMyBunnies)
        console.log('res de getMyBunnies front:', res)
      })
      .catch(error => {
        navigate(pages.home);
        alert(error.response.data);
        console.log('error de getMyBunnies front:', error)
      });
  }, [user]);

console.log('tudo de myBunnies aqui:', myBunnies)

  return (
    <MyBunniesContainer>
       {/*colocar depois um header  */}
       <h1>Página dos meus Coelhinhos</h1>
      <BunnyContainer>
        <Main>
          {myBunnies ? (
            myBunnies.map((item, index) =>
            <div key={index}>
            <h1>Nome do tutor(a): {item.dono}</h1>
            <MyBunny key={item.id} item={item}/>
            </div>
            )
          ) : (
            <ThreeDots type="ThreeDots" color="#ffffff" height={90} width={150} />
          )}
        </Main>
      </BunnyContainer>
    </MyBunniesContainer>
  )
}

const MyBunniesContainer = styled.div`
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