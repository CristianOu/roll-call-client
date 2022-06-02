import {useEffect, useState,} from "react";
import {getWeatherData} from "../../services/api";

function WeatherInfoBar() {

    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(undefined);

    useEffect(() => {
        getWeatherData().then((response) => {
            setData({
                temperature: response.data.features[0].properties.value,
                observedAt: new Date(response.data.features[0].properties.observed).toString()
            })
            setError(undefined);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setError('Could not get weather data.');
        });
    }, []);

    const render = () => {
        if (error) {
            return <text>{error}</text>
        }

        if (loading) {
            return <text>Loading...</text>
        }

        // console.log('mock data = ', data) // for testing only

        return (
            <div style={{width: '100%', height: 50 }}>
                <text data-testid="temperature" style={{marginRight: 20}}>Temperature: {data.temperature}</text>
                <text data-testid="observedAt">Observed at: {data.observedAt}</text>
            </div>
        );
    }

    return render();
}

export default WeatherInfoBar;
