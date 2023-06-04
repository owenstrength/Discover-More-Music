import GlobalStyle from './styles/GlobalStyle';
import React from "react";

import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import ConfigurePlaylist from './pages/ConfigurePlaylist';

import { accessToken, getCurrentUserProfile } from './spotify';


// render home page and initialize  variables
function App() {
  const [token, setToken] = React.useState(null);
  const [profile, setProfile] = React.useState(null);



  React.useEffect(() => {

    const fetchData = async () => {
      setToken(accessToken);
      console.log("APP.js " + accessToken)
      try {
        const response = await getCurrentUserProfile();
        console.log("RESPONSE", response);
        if (profile == null) {
          setProfile(response.body);
        }
      } catch (e) {
        console.error(e);
        Window.location.reload()
      }
    }
    setToken(accessToken)
    fetchData()
  }, [profile]);


  console.log('PROFILE ', profile)
  // show login button if not logged in else show login button
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : profile ? (
          <Router>
            <Routes>
              <Route path="/configure-playlist" element={<ConfigurePlaylist />} />

              <Route
                path="/"
                element={
                  <>
                    <Home profile={profile} />
                    <Link to="/configure-playlist"></Link>
                  </>
                }
              />
            </Routes>
          </Router>
        ) : null}
      </header>
    </div>
  );
}

export default App;