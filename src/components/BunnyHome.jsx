import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import { pages } from "../routes/routes";

export default function BunnyHome({ item }) {
    const navigate = useNavigate();

    function openUrlId(urlId) {
        navigate(pages.bunnyId + urlId)
    };    

    return (
        <>
        <BunnyBoxHome>
            <ItemBunny onClick={() => openUrlId(item.id)}>
                <img src={item.url} width={80}/>
                <div>Nome do Coelho: {item.name}</div>
                <div>Age: {item.age}</div>
            </ItemBunny>
        </BunnyBoxHome>
        </>
    )
}

const BunnyBoxHome = styled.div`
border: 1px solid black;
`

const ItemBunny = styled.div`
border: 1px solid red;
`