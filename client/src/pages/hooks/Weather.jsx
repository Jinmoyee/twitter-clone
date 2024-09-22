// Weather.js
import { useEffect, useState } from "react";

const API_KEY = '720d5b6443b93d2399a721d8701b2f1a';

const Weather = ({ lat, lon }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                const data = await response.json();
                if (response.ok) {
                    setWeather({
                        temp: data.main.temp,
                        description: data.weather[0].description,
                        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                    });
                } else {
                    console.error("Error fetching weather:", data);
                }
            } catch (error) {
                console.error("Error fetching weather:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lon]);

    if (loading) return <div>Loading weather...</div>;

    return (
        <div>
            {weather ? (
                <div className='flex items-center'>
                    <img src={weather.icon} alt="Weather icon" className='w-6 h-6' />
                    <span className='ml-2'>{weather.temp}°C, {weather.description}</span>
                </div>
            ) : (
                <span>Error fetching weather</span>
            )}
        </div>
    );
};

export default Weather;
