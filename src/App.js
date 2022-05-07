import {useEffect, useState} from 'react';
import './App.css';
import http from "./services/http.service";
import StatisticsPage from "./StatisticsPage";

function App() {

    const [data, setData] = useState(0);
        
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
