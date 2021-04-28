import React from 'react';
import { Redirect } from 'react-router-dom';
import Posts from '../Posts/Posts';
import { HomePageContainer, StyledLink, StyledButton } from "./styles";
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