import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import { pages } from "./routes/routes";
import SignInPage from "./pages/SignInPage";
import { useState } from "react";
import SignUpPage from "./pages/SignUpPage";
import GetStarted from "./pages/GetStarted";
import HomePage from "./pages/HomePage";
import BunnyPage from "./pages/BunnyPage";
import FormPage from "./pages/FormPage";
import MyBunniesPage from "./pages/MyBunniesPage";
import UpdateFormPage from "./pages/UpdateFormPage";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopOnPageChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [user, setUser] = useState(0)

  return (
   
      <AuthContext.Provider value={{user, setUser}}>
        <BrowserRouter>
        <ScrollToTopOnPageChange />
        <Routes>
          <Route path={pages.getStarted} element={<GetStarted />} />
          <Route path={pages.signIn} element={<SignInPage />} />
          <Route path={pages.signUp} element={<SignUpPage />} />
          <Route path={pages.home} element={<HomePage />} />
          <Route path={pages.formPage} element={<FormPage />} />
          <Route path={pages.bunnyId + ':id'} element={<BunnyPage />} />
          <Route path={pages.myBunnies} element={<MyBunniesPage />} />
          <Route path={pages.updateBunny + ':id'} element={<UpdateFormPage />} />
        </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
   
  );
}

export default App;
