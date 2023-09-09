import styled from 'styled-components/macro';

// CSS Styled Componets for the page
const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const StyledLoginButton = styled.a`
  display: flex;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-xl);
  padding: var(--spacing-sm) var(--spacing-xl);
  img { 
    width: 50px;
    height: 50px;
    margin-right: -10px;
    margin-top: -10px;
    margin-bottom: -10px;
    transition: all 0.3s ease;
  }

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
    font-size: var(--fz-xxl);
    img {
    width: 60px;
    height: 60px;
    transition: all 0.3s ease;
    }
  },
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


// use backend link for login
const Login = () => (
  <StyledLoginContainer>
    <StyledTitle>Discover More Music</StyledTitle>
    <StyledDescription>listen to something new</StyledDescription>
    <StyledLoginButton href="https://discover-more-music-backend.onrender.com/login">
      Log in with Spotify
      <img src="https://developer.spotify.com/images/guidelines/design/icon4@2x.png" alt="Spotify Logo"></img>
    </StyledLoginButton>
  </StyledLoginContainer>
);

export default Login;