import {useEffect, useState} from 'react';
import './App.css';
import http from "./services/http.service";
import StatisticsPage from "./StatisticsPage";

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
            <StatisticsPage/>
        </div>
    );
}

export default App;
