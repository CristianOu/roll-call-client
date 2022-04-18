import { useEffect, useState } from 'react';
import './App.css';
import http from "./services/http.service";

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
      {data.key}
    </div>
  );
}

export default App;
