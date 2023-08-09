import styled from "styled-components"

export default function MyBunniesPage() {
  return (
    <MyBunniesContainer>
      <h1>Página que mostra sobre o tutor-userId e seus coelhos registrados</h1>
    <br />
    <h1>Para isso, será necessário criar rota no back que nem o user/me do projeto anterior</h1>
    <br />
    <h1>Depois vai poder clicar em cada coelho e ser redirecionado para a tela de update</h1>
    <br />
    <h1>Para isso, nessa tela de update será necessário criar uma rota no back. Olhar projeto boardCamp que faz update</h1>
    </MyBunniesContainer>
  )
}

const MyBunniesContainer = styled.div`
  /* height: 100vh; */
`
