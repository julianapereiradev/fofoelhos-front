import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components"
import AuthContext from "./contexts/AuthContext";
import { pages } from "./routes/routes";
import SignInPage from "./pages/SignInPage";
import { useState } from "react";
import SignUpPage from "./pages/SignUpPage";
import GetStarted from "./pages/GetStarted";
import HomePage from "./pages/HomePage";

function App() {
  const [user, setUser] = useState(0)


  return (
    <PagesContainer>
      <AuthContext.Provider value={{user, setUser}}>
        <BrowserRouter>
        <Routes>
          <Route path={pages.getStarted} element={<GetStarted />} />
          <Route path={pages.signIn} element={<SignInPage />} />
          <Route path={pages.signUp} element={<SignUpPage />} />
          <Route path={pages.home} element={<HomePage />} />
        </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </PagesContainer>
  );
}

export default App;

const PagesContainer = styled.main`
 background-color: #fff;
`