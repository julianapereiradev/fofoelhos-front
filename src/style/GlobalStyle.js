import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Sacramento', cursive;
        font-family: 'Montserrat', sans-serif;
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
    }
    body {
        max-width: 500px;
		height: 100vh;
		background-color: #ffffff;
        font-family: 'Sacramento', cursive;
        font-family: 'Montserrat', sans-serif;
    }

    button {
        cursor: pointer;
        background-color: #babae7;
        border: none;
        border-radius: 50px;
        color: #FFFFFF;
        height: 45px;
		width: 100%;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 1px;
        box-shadow: 1px 10px 32px rgba(186, 186, 231, 0.86);
        font-family: 'Montserrat', sans-serif;
        
        &:hover {
        color:#babae7;
        background-color: white;
        }
    }

    input {
        font-family: 'Sacramento', cursive;
        font-family: 'Montserrat', sans-serif;
		height: 50px;
		width: 100%;
		border: 2px solid #ededf1;
		border-radius: 10px;
		font-size: 20px;
		margin-bottom: 10px;
        color: #8a8a8a;
        font-size: 13px;
        letter-spacing: 1px;
        padding-left: 10px;
        font-weight: 700;
        accent-color: #8a8a8a;
        
        &:focus {
        outline: none;
        border: 1px solid #8a8a8a;
        font-family: 'Sacramento', cursive;
        font-family: 'Montserrat', sans-serif;
        color: #8a8a8a;
        font-size: 13px;
        letter-spacing: 1px;
        padding-left: 10px;
        font-weight: 700;
    }

		&::placeholder {
            font-family: 'Sacramento', cursive;
        font-family: 'Montserrat', sans-serif;
			color: #8a8a8a;
            font-size: 13px;
            letter-spacing: 1px;
            padding-left: 10px;
            font-weight: 400;
		}	
	}

    select {
        width: 100%;
        height: 50px;
        border-radius: 10px;
        background-color: #FFFFFF;
        color: #8a8a8a;
        font-size: 13px;
        letter-spacing: 2px;
        padding-left: 10px;
        margin-bottom: 10px;
        font-weight: 400;
        border: 2px solid #ededf1;
        

        &:focus {
        outline: none;
        border: 1px solid #8a8a8a;
        font-family: 'Sacramento', cursive;
        font-family: 'Montserrat', sans-serif;
        color: #8a8a8a;
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 700;
    }
    }

    ion-icon {
       cursor: pointer;
    }
`;

export default GlobalStyle;
