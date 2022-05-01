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
            <div className={`c100 p${percentage} small dark`} style={{backgroundColor:iconName === 'arrowUp' ? '#E6FBD9' : '#FFE8D7'}}>
                <span>
                    <img src={require(`./images/${iconName}.png`)} style={{width:20, height:20}} alt={''}/>
                </span>
                <div className="slice" style={{  }}>
                    <div className="bar" style={{borderColor: iconName === 'arrowUp' ? '#44C13C' : '#FF513A', transform: `rotate(${3.6 * percentage}deg)`}}/>
                    <div className="fill" style={{borderColor: iconName === 'arrowUp' ? '#44C13C' : '#FF513A'}}/>
                </div>
            </div>
        </div>
    );
}

export default MetricContainer;
