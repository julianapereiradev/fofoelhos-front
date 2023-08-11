import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../routes/routes";

export default function BunnyHome({ item }) {
  const navigate = useNavigate();

  function openUrlId(urlId) {
    navigate(pages.bunnyId + urlId);
  }

  return (
    <ItemBunny onClick={() => openUrlId(item.id)}>
      <ItemImageWrapper>
        <img src={item.url} alt="Imagens de Coelho" />
      </ItemImageWrapper>
      <ItemInfo>
        <div><p>{item.name}</p></div>
        <div><p>{item.age}</p></div>
      </ItemInfo>
    </ItemBunny>
  );
}

const ItemBunny = styled.div`
  border: none;
  width: 100%;
  height: 270px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: rgba(255, 153, 92, 0.5);
  cursor: pointer;

  &:hover {
    background: none;
  }
`;

const ItemImageWrapper = styled.div`
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 1.0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover img {
    opacity: 0.6;
  }
`;

const ItemInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 25px 10px;
  background-color: rgba(255, 153, 92, 0.5);;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  p {
    font-family: 'Pontano Sans', sans-serif;
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 1px;
  }
`;
