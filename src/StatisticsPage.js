import './App.css';
import TopBar from "./TopBar";
import MetricContainer from "./MetricContainer";

function StatisticsPage() {
    // get user role and get relevant data
    // pass data down to components as props
    return (
        <div>
            <TopBar/>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',}}>
                <MetricContainer title={`Overall attendance`} percentage={1} diff={10}/>
                <MetricContainer title={`Overall attendance test 1`} percentage={25} diff={10}/>
                <MetricContainer title={`Overall attendance test 2`} percentage={45} diff={10}/>
                <MetricContainer title={`Overall attendance test 3`} percentage={65} diff={10}/>
                <MetricContainer title={`Overall attendance test 3`} percentage={99} diff={10}/>
                <MetricContainer title={`This week's attendance test 4`} percentage={75} diff={-10}/>
                <MetricContainer title={`This month's attendance`} percentage={100} diff={0}/>
            </div>
            {/*table component*/}
        </div>
    );
}

export default StatisticsPage;
