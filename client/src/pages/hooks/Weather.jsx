import { useEffect, useState } from "react";

const API_KEY = '720d5b6443b93d2399a721d8701b2f1a';

const Weather = ({ lat, lon, locationName }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to get coordinates from a text location
    const getCoordinatesFromLocation = async (location) => {
        try {
            const response = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
            );
            const data = await response.json();
            if (data.length > 0) {
                return { lat: data[0].lat, lon: data[0].lon };
            } else {
                console.error("Location not found");
                return null;
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchWeather = async () => {
            let latitude = lat;
            let longitude = lon;

            // If no coordinates are provided, try to get them from location name
            if (!lat || !lon) {
                const coords = await getCoordinatesFromLocation(locationName);
                if (coords) {
                    latitude = coords.lat;
                    longitude = coords.lon;
                }
            }

            if (latitude && longitude) {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
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
            } else {
                setLoading(false);
                console.error("Unable to fetch coordinates for the location");
            }
        };

        fetchWeather();
    }, [lat, lon, locationName]);

    if (loading) return <div>Loading weather...</div>;

    return (
        <div>
            {weather ? (
                <div className='flex items-center'>
                    <img src={weather.icon} alt="Weather icon" className='w-6 h-6' />
                    <span className='ml-2'>{weather.temp}°C, {weather.description}</span>
                </div>
            ) : (
                <span></span>
            )}
        </div>
    );
};

export default Weather;
