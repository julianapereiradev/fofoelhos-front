import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { pages } from "../routes/routes";
import isPropValid from "@emotion/is-prop-valid";

export default function MyBunny({ item }) {
  const navigate = useNavigate();

  function openUrlId(urlId) {
    navigate(pages.updateBunny + urlId);
  }

  return (
    <ItemContainer>
      <ItemBunny
        isactive={item.active.toString()}
        onClick={() => openUrlId(item.id)}
      >
        <ItemImageWrapper isactive={item.active.toString()}>
          <img src={item.url} alt="Imagens de Coelho" />
        </ItemImageWrapper>
      </ItemBunny>
      <TextBox>
        <p>
          <span>{item.name}</span>
        </p>
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
  background-color: ${({ isactive }) =>
    isactive === "true" ? "none" : "black"};

  &:hover {
    background: #ffffff;
  }
`;

const ItemImageWrapper = styled.div`
  img {
    height: 100%;
    width: 100%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ isactive }) => (isactive === "true" ? 1.0 : 0.4)};
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
    font-family: "Sacramento", cursive;
  }
`;

ItemBunny.shouldForwardProp = prop => isPropValid(prop);
ItemImageWrapper.shouldForwardProp = prop => isPropValid(prop);
