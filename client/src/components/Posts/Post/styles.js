import styled from "styled-components";
import { Card } from "react-rainbow-components";
import { Link } from "react-router-dom";

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
`
export const MessageContainer = styled.div`
  font-size: 1.25rem;
  padding: 15px;
`
export const PostTitle = styled.h1`
  font-size: 2rem;
`
export const PostAuthor = styled.p`
  font-size: 1.25rem;
`
export const StyledLink = styled(Link)`
  text-decoration: none;
  transition: 0.1s;
  :hover {
    text-decoration: none;
    filter: brightness(90%);
  }
`;