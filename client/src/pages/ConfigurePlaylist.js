import styled from 'styled-components/macro';
import { logout, createUserPlaylist } from '../spotify';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import React from 'react';

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
  flex-direction: row;
  font-size: 50;
  text-align: center;
`;

const StyledDescription = styled.h2`
  display: inline-block;
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 500;
  font-size: var(--fz-md);
  padding: var(--spacing-xs) var(--spacing-md);
`;

const StyledSliderTitle = styled.h2`
  display: inline-block;
  color: var(--white);
  font-weight: 500;
  font-size: var(--fz-md);
`;

const StyledCreateButton = styled.button`
  display: inline-block;
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
    background-color: var(--green);
    img {
      width: 60px;
      height: 60px;
      transition: all 0.3s ease;
    }
  }
`;

// Song properties variable
var properties = {};

// Slider component with dynamic width
function CustomSlider({ defaultValue, ariaLabel, valueLabelDisplay, color, onChange, width, title }) {
  return (
    <Box sx={{ width }}>
      <StyledSliderTitle>{title}</StyledSliderTitle>
      <Slider
        defaultValue={defaultValue}
        aria-label={ariaLabel}
        valueLabelDisplay={valueLabelDisplay}
        color={color}
        onChange={onChange}
      />
    </Box>
  );
}

// All sliders on the page below for setting a parameter in the recoomendations function.
function AcousticnessSlider() {
  properties.acousticness = 70;

  const handleAChange = (event, newValue) => {
    properties.acousticness = newValue;
  };

  return (
    <CustomSlider
      defaultValue={70}
      ariaLabel="target_acousticness"
      title="Target Acousticness"
      valueLabelDisplay="auto"
      color="secondary"
      onChange={handleAChange}
      width={'33%'}
    />
  );
}

function DanceabilitySlider() {
  properties.danceability = 80;

  const handleDChange = (event, newValue) => {
    properties.danceability = newValue;
  };

  return (
    <CustomSlider
      defaultValue={80}
      ariaLabel="target_danceability"
      title="Target Danceability"
      valueLabelDisplay="auto"
      color="secondary"
      onChange={handleDChange}
      width={'33%'}
    />
  );
}

function InstrumentalnessSlider() {
  properties.instrumentalness = 55;

  const handleIChange = (event, newValue) => {
    properties.instrumentalness = newValue;
  };

  return (
    <CustomSlider
      defaultValue={55}
      ariaLabel="target_instrumentalness"
      title="Target Instrumentalness"
      valueLabelDisplay="auto"
      color="secondary"
      onChange={handleIChange}
      width={'33%'}
    />
  );
}

function EnergySlider() {
  properties.energy = 65;

  const handleEChange = (event, newValue) => {
    properties.energy = newValue;
  };

  return (
    <CustomSlider
      defaultValue={65}
      ariaLabel="target_energy"
      title="Target Energy"
      valueLabelDisplay="auto"
      color="secondary"
      onChange={handleEChange}
      width={'33%'}
    />
  );
}

function PopularitySlider() {
  properties.popularity = 85;

  const handlePChange = (event, newValue) => {
    properties.popularity = newValue;
  };

  return (
    <CustomSlider
      defaultValue={85}
      ariaLabel="target_popularity"
      title="Target Popularity"
      valueLabelDisplay="auto"
      color="secondary"
      onChange={handlePChange}
      width={'33%'}
    />
  );
}

// Display sliders and create playlist button
function ConfigurePlaylist() {
  return (
    <>
      <StyledHomeNavBar>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
        <a href="https://github.com/owenstrength/Discover-More-Music" target="_blank">GitHub</a>
        <button onClick={logout}>log out</button>
      </StyledHomeNavBar>

      <StyledHomeContainer>
        <StyledTitle>Tell us about the music you want to hear</StyledTitle>
        <StyledDescription>we'll try our best to find music you'll love</StyledDescription>

        <AcousticnessSlider />
        <DanceabilitySlider />
        <InstrumentalnessSlider />
        <EnergySlider />
        <PopularitySlider />

        <br />

        <StyledCreateButton onClick={() => createUserPlaylist(properties.acousticness, properties.danceability, properties.instrumentalness, properties.energy, properties.popularity)}>
          Create a New Playlist
          <img src="https://developer.spotify.com/images/guidelines/design/icon4@2x.png" alt="Spotify Logo" />
        </StyledCreateButton>
      </StyledHomeContainer>
    </>
  );
}

export default ConfigurePlaylist;