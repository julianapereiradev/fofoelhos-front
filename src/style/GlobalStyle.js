import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
    }
    body {
      background-color: #fff;
    }

    button {
        cursor: pointer;
        background-color: #F9A149;
        color: #FFFFFF;
    }

`

export default GlobalStyle