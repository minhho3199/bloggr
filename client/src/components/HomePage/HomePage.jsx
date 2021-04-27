import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Posts from '../Posts/Posts';
import { Button } from "react-rainbow-components";
import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  transition: 0.1s;
  :hover {
    text-decoration: none;
    filter: brightness(90%);
  }
  margin-left: 50px;
  /* flex-grow: 1; */
  width: 10%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`
const HomePage = () => {


  if(!("usertoken" in localStorage)) {
    return <Redirect to="/" />
  }
  return (
    <HomePageContainer>
      <Posts />
      <StyledLink to="/create">
        <StyledButton type="submit" label="Create Post" variant="brand" />
      </StyledLink>
    </HomePageContainer>
  );
}

export default HomePage;