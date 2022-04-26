import {useEffect, useState} from 'react';
import './App.css';
import http from "./services/http.service";
import TopBar from "./TopBar";
import MetricContainer from "./MetricContainer";

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
            <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', }}>
                <MetricContainer title={`Overall attendance`} percentage={1} diff={10}/>
                <MetricContainer title={`This week's attendance`} percentage={75} diff={-10}/>
                <MetricContainer title={`This month's attendance`} percentage={100} diff={0}/>
            </div>
        </div>
    );
}

export default App;
