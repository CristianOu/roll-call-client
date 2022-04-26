import {useEffect, useState} from 'react';
import './App.css';
import http from "./services/http.service";
import TopBar from "./TopBar";
import StatisticCircle from "./StatisticCircle";

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
            <TopBar/>
            <StatisticCircle title={`This week's attendance`}/>
            <StatisticCircle title={`This month's attendance`}/>
            <StatisticCircle title={`This week's attendance`}/>
        </div>
    );
}

export default App;
