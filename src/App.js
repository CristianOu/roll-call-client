import { useEffect, useState } from 'react';
import './App.scss';
import http from "./services/http.service";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import RollCall from './pages/RollCall';
import SideBar from './components/side-bar/SideBar';

function App() {

  const [data, setData] = useState(0);
  
  useEffect(() => {
    http
      .get("/")
      .then((res) => {
        setData(res.data);
      })
  }, []);

  return (
    <div className="App">
      <SideBar className='side-bar-column'/>
      <Router>
        <Routes>
          <Route path="/" element={<RollCall className='roll-call-page-container' />}/>          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
