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

  const [session, setSession] = useState({});

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await http.get('/getsession');
        setSession(response.data)
      } catch (error) {
        console.log(error);
      } 
    }
    fetchSession();
  }, []);

  console.log('session', session);
  return (
    <div className='App'>
      {
        session.userId ?
          <SideBar className='side-bar-container' /> :
          ""
      }
        <Routes>
          <Route path="/" element={ session.userId ? (<RollCall className='roll-call-page-container' />) : (<LogInPage className={'login-container'} setSession={setSession}/>)}/>
          <Route path="/statistics" element={ session.userId ? (<StatisticsPage />) : (<LogInPage className={'login-container'} setSession={setSession}/>)} />
          <Route path="/login" element={ session.userId ? (<Navigate to="/" />) : (<LogInPage className={'login-container'} setSession={setSession}/>)}/>
          <Route
            path="*"
            element={
              session.userId ? (
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here for now!</p>
                </main>
              ) : (
                <LogInPage className={'login-container'} setSession={setSession} />
              )
              
            }/>
        </Routes>
    </div>
  );
}

export default App;
