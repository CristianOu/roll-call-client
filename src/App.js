import {useEffect, useState} from 'react';
import './App.css';
import http from "./services/http.service";
import StatisticsPage from "./StatisticsPage";
import SideBar from './components/side-bar/SideBar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RollCall from './pages/RollCall';

function App() {

  const [data, setData] = useState(0);

  useEffect(() => {
    http.get("/").then(res => {
      setData(res.data);
    })
  }, []);

  return (
    <div className="App">
      <SideBar className='side-bar-column'/>
      <Router>
        <Routes>
          <Route path="/" element={<RollCall className='roll-call-page-container' />}/>
          <Route path="/statistics" element={<StatisticsPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
