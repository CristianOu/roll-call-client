import {useEffect, useState} from 'react';
import './App.scss';
import http from "./services/http.service";
import StatisticsPage from "./pages/StatisticsPage";
import SideBar from './components/side-bar/SideBar';
import "@fontsource/plus-jakarta-sans"; // Defaults to weight 400.
import { Route, Routes, Navigate } from 'react-router-dom';
import RollCall from './pages/RollCall';
import LogInPage from './pages/LogInPage';

function App() {

  const [data, setData] = useState(0);

  useEffect(() => {
    http.get("/").then(res => {
      setData(res.data);
    })
  }, []);

  function isUserLoggedIn() {
    return false; 
  }

  return (
    <div className='App'>
      {
        isUserLoggedIn() ?
          <SideBar className='side-bar-container' /> :
          ""
      }
        <Routes>
          <Route path="/" element={<RollCall className='roll-call-page-container' />}/>
          <Route path="/statistics" element={<StatisticsPage />} className='roll-call-page-container'/>
          <Route path="/login" element={isUserLoggedIn() ? (<Navigate to="/" />) : (<LogInPage className={'login-container'} />)}/>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }/>
        </Routes>
    </div>
  );
}

export default App;
