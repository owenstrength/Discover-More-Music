import styled from 'styled-components/macro';
import {  logout } from '../spotify';

// CSS Styled Componets for the page
const StyledHomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const StyledHomeNavBar = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: end;
  padding: var(--spacing-sm) var(--spacing-xl);
`;

const StyledTitle = styled.h1`
  display: inline-block;
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-xxxl);

`;

const StyledDescription = styled.h2`
  display: inline-block;
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 500;
  font-size: var(--fz-md);
  padding: var(--spacing-xs) var(--spacing-md);

`;

const StyledCreateButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-xl);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
    font-size: var(--fz-xxl)
  },
`;

// displays homepage with button leading to configure page
const Home = (profile) => (
        <>  
        
        {profile ? (
            <>
            <StyledHomeNavBar>
                <button onClick={logout}>log out</button>
            </StyledHomeNavBar>
            <StyledHomeContainer>
          <StyledTitle>hey {profile.display_name}</StyledTitle>
          <StyledDescription>are you ready to discover new music?</StyledDescription>
          <StyledCreateButton
                className = "App-link"
                href = "/configure-playlist"
              >
                Configure a new playlist
              </StyledCreateButton>
              </StyledHomeContainer>
              </>
        ): (
          console.log('shit aint loaded')
          
        )}
      </>
      
);

export default Home;