import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Posts from '../Posts/Posts';
import { Button } from "react-rainbow-components";
import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  transition: 0.1s;
  :hover {
    text-decoration: none;
    filter: brightness(90%);
  }
  margin-bottom: 20px;
  width: 50%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`
const HomePage = () => {


  if (!("usertoken" in localStorage)) {
    return <Redirect to="/" />
  }
  return (
    <HomePageContainer>
      <StyledLink to="/create">
        <StyledButton type="submit" label="Create Post" variant="brand" />
      </StyledLink>
      <Posts />
    </HomePageContainer>
  );
}

export default HomePage;