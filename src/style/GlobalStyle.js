import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Pontano Sans', sans-serif;
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
    }
    body {
        max-width: 400px;
		height: 100vh;
		background-color: #fff4ee;
        border: 1px solid black;
        font-family: 'Pontano Sans', sans-serif;
    }

    button {
        cursor: pointer;
        background-color: #ff995c;
        border: none;
        border-radius: 50px;
        color: #FFFFFF;
        height: 45px;
		width: 100%;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;
        box-shadow: 1px 10px 32px rgba(255,153,92,0.86);
        
        &:hover {
        color: #ff995c;
        background-color: white;
        }
    }

    input {
        font-family: 'Pontano Sans', sans-serif;
		height: 50px;
		width: 80%;
		border: none;
		border-radius: 10px;
		font-size: 20px;
		margin-bottom: 10px;
        color: #b46f45;
        font-size: 16px;
        letter-spacing: 1px;
        
        &:focus {
        outline: none;
        border: 1px solid #b46f45;
        font-family: 'Pontano Sans', sans-serif;
        color: #b46f45;
        font-size: 16px;
        letter-spacing: 1px;
    }

		&::placeholder {
			font-family: 'Pontano Sans', sans-serif;
			color: #b46f45;
            font-size: 12px;
            letter-spacing: 2px;
            padding-left: 10px;
		}	
	}

`;

export default GlobalStyle;
