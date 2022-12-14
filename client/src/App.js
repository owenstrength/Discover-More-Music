import GlobalStyle from './styles/GlobalStyle';
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import ConfigurePlaylist from './pages/ConfigurePlaylist';

import { accessToken, getCurrentUserProfile  } from './spotify';


// render home page and initialize  variables
function App() {
  const [token, setToken] = React.useState(null);
  const [profile, setProfile] = React.useState(null);



  React.useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const response = await getCurrentUserProfile();
        setProfile(response.body);
      } catch(e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);

  // show login button if not logged in else show login button
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <>
          <Login />
          </>
        ) : (
          <Router>
            <Routes>
              <Route path="/configure-playlist" element={<ConfigurePlaylist />}>
              </Route>

              <Route path="/" element={Home(profile)}>
              </Route>
          </Routes>
        </Router>
        
      )}
      </header>
    </div>
  );
}

export default App;