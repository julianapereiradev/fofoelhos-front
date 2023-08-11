import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../routes/routes";

export default function BunnyHome({ item }) {
  const navigate = useNavigate();

  function openUrlId(urlId) {
    navigate(pages.bunnyId + urlId);
  }

  return (
    <ItemContainer>
      <ItemBunny onClick={() => openUrlId(item.id)}>
        <ItemImageWrapper>
          <img src={item.url} alt="Imagens de Coelho" />
        </ItemImageWrapper>
      </ItemBunny>
      <TextBox>
        <p><span>{item.name}</span></p>
        <p>{item.age}</p>
      </TextBox>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ItemBunny = styled.div`
 border-top-right-radius: 10px;
 border-top-left-radius: 10px;
  width: 100%;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  box-shadow: rgba(150, 146, 146, 0.05) 0px 6px 24px 0px, rgba(150, 146, 146, 0.08) 0px 0px 0px 1px;
  &:hover {
    background: none;
  }
`;

const ItemImageWrapper = styled.div`
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover img {
    opacity: 0.6;
  }
`;

const TextBox = styled.div`
  padding-left: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: #f7f5f5;
 p {
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: 3px;
  color: #8a8a8a;
  
 }

 span {
  font-weight: 700;
  font-size: 25px;
  font-family: 'Sacramento', cursive;
 }
`;
