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
    }

    button {
        cursor: pointer;
        background-color: #ff995c;
        border: none;
        border-radius: 50px;
        color: #FFFFFF;
        width: 100%;
        height: 45px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;
        box-shadow: 1px 10px 32px rgba(255,153,92,0.86);
    }

    input {
		/* height: 45px;
		width: 100%;
		font-family: 'Lexend Deca', sans-serif;
		border: 1px solid #D4D4D4;
		border-radius: 5px;
		font-size: 20px;
		display: flex;
		align-items: center;
		margin-bottom: 8px;
		&::placeholder {
			font-family: 'Lexend Deca', sans-serif;
			color: #DBDBDB;
		}	 */
	}

`;

export default GlobalStyle;
