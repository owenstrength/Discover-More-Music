import styled from 'styled-components/macro';
import { logout } from '../spotify';
import { Link } from 'react-router-dom';

// CSS Styled Componets for the page
const StyledHomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const StyledHomeNavBar = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
const Home = ({ profile }) => {

  console.log('HOMEPAGE PROFILE', profile)
  return (
    <>

      {profile ? (
        <>
          <StyledHomeNavBar>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
            <a href="https://github.com/owenstrength/Discover-More-Music" target="_blank">GitHub</a>
            <button onClick={logout}>log out</button>
          </StyledHomeNavBar>
          <StyledHomeContainer>
            <StyledTitle>hey {profile.display_name}</StyledTitle>
            <StyledDescription>are you ready to discover new music?</StyledDescription>
            <Link to="/configure-playlist">
              <StyledCreateButton className="App-link">
                Configure a New playlist
              </StyledCreateButton>
            </Link>
          </StyledHomeContainer>
        </>
      ) : (
        console.warn('Error Loading Profile')

      )}
    </>

  );
}

export default Home;