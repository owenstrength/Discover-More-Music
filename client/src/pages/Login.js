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
    </StyledLoginButton>
  </StyledLoginContainer>
);

export default Login;