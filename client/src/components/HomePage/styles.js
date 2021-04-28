import { Link } from 'react-router-dom';
import { Button } from "react-rainbow-components";
import styled from 'styled-components';

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
export const StyledLink = styled(Link)`
  text-decoration: none;
  transition: 0.1s;
  :hover {
    text-decoration: none;
    filter: brightness(90%);
  }
  margin-bottom: 20px;
  width: 50%;
`;

export const StyledButton = styled(Button)`
  width: 100%;
`