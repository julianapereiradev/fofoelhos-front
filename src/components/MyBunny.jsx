import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import { pages } from "../routes/routes";

export default function MyBunny({ item }) {
    const navigate = useNavigate();

    function openUrlId(urlId) {
        navigate(pages.updateBunny + urlId)
    };    

    return (
        <>
        <BunnyBox>
            <ItemBunny onClick={() => openUrlId(item.id)}>
                <img src={item.url} width={80} alt="Imagens de Coelho"/>
                <div>Nome do Coelho: {item.name}</div>
                <div>Age: {item.age}</div>
                <div> Active: {item.active === true ? ('ativo') : ('inativo')}</div>
            </ItemBunny>
        </BunnyBox>
        </>
    )
}

const BunnyBox = styled.div`
border: 1px solid black;
`

const ItemBunny = styled.div`
border: 1px solid red;
`