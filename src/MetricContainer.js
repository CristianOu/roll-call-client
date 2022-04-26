import './App.css';
import {useEffect, useState} from "react";

function MetricContainer({title, percentage, diff}) {

    const [iconName, setIconName] = useState('arrowUp');

    useEffect(() => {
        if (diff >= 0) {
            setIconName('arrowUp')
        } else {
            setIconName('arrowDown')
        }
    }, [diff]);

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: 120, width:300, justifyContent:"space-between", boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', alignItems:'center', margin:10, }}>
            <div style={{display:'flex', flexDirection:'column', paddingLeft:10,}}>
                <text style={{fontSize: 20,}}>{title}</text>
                <text>{`${percentage}%`}</text>
            </div>
            <div className={`c100 p${percentage} small dark`}>
                <span>
                    <img src={require(`./images/${iconName}.png`)} style={{width:20, height:20}} alt={''}/>
                </span>
                <div className="slice">
                    <div className="bar"/>
                    <div className="fill"/>
                </div>
            </div>
        </div>
    );
}

export default MetricContainer;
