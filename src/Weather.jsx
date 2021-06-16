import PopUp from './components/PopUp'
import { useEffect,useState } from 'react';
import axios from 'axios'
import rain from './Weather_Images/rain.svg';
import sun from './Weather_Images/sun.svg';
import cloudy from './Weather_Images/cloudy.svg';
import wind from './Weather_Images/wind.svg';
import storm from './Weather_Images/storm.svg';
import snow from './Weather_Images/cold.svg';

const src_img = (main) => {
    const weather_stations = {
        "Clouds": cloudy,
        "Thunderstorm": storm,
        "Drizzle": rain,
        "Rain": rain,
        "Snow": snow,
        "Clear": sun,
        "Mist": wind,
        "Smoke": wind,
        "Haze": wind,
        "Dust": wind,
        "Fog": wind,
        "Sand": wind,
        "Ash": wind,
        "Squall": wind,
        "Tornado": wind
    }
    return weather_stations[main];
}


const formatText = (text) => {
    let array_city = text.split(" ");
    let cityFormatted = []
    if (array_city.length > 1) {
        for (let i = 0; i < array_city.length; i++) {
            cityFormatted.push(array_city[i].charAt(0).toUpperCase() + array_city[i].substring(1).toLowerCase())
        }
    } else {
        cityFormatted.push(array_city[0].charAt(0).toUpperCase() + array_city[0].substring(1).toLowerCase());
    }
    return `${cityFormatted.join(' ')}`;
}



export default function Weather({loc}){
    const [popup,setPopUp] = useState(false)
    const [TodayWeather,setTodayWeather] = useState()
    const [loading,setLoading] = useState(true)
    
    useEffect(() => {
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&lang=es&units=metric&appid=20077d691854624ff7bbf5299c7c6763`)
        .then((weather_data) => {
            setTodayWeather(weather_data.data)
            setLoading(false)
        })
        .catch((error) => {
            setPopUp(c => !c)
            console.log("--> Error fetching data: ",error)
        })
        .finally(() => {
            console.log("Finished")
        })  
    }, [loc])

    if(popup){
        return <PopUp />
    }
    if(loading){
        return <h1>Loading...</h1>
    }
    console.log(TodayWeather)
    const response_src = src_img(TodayWeather.weather[0]["main"])
    return (
        <div>
            <h1>{TodayWeather["name"]}, {TodayWeather.sys["country"]}</h1>
            <div id="Box">
                    <div id="weather">
                        <img src={response_src} alt="Imagen del clima" />
                        <h1>{TodayWeather.main["temp"]} °C</h1>
                    </div>
                        <h1>{formatText(TodayWeather.weather[0]["description"])}</h1>
                </div>
        </div>
    )
}