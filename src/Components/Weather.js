import React, { useState } from 'react'
import './Weather.css';
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';


const Weather = () => {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = "5acc1683650652bab831ecf7d57fd397";


function handleOnChange(event) {
  const value = event.target.value;
  setCity(value);

  
  if (value.trim() === '') {
    setWeather(null);
    setError('');
  }
}
  async function fetchData() {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      let response = await fetch(url);
      let output = await response.json();

      if (response.ok) {
        setWeather(output);
        setError('');
      } else {
        setError('No data found. Please enter a valid city name.');
        setWeather(null);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  }

  //
  let weatherType = weather?.weather?.[0]?.main?.toLowerCase() || '';
  let backgroundClass = '';

  if (weatherType.includes('cloud')) {
    backgroundClass = 'cloudy-bg';
  } else if (weatherType.includes('clear')) {
    backgroundClass = 'clear-bg';
  } else if (weatherType.includes('rain')) {
    backgroundClass = 'rainy-bg';
  } else if (weatherType.includes('snow')) {
    backgroundClass = 'snowy-bg';
  } else if (weatherType.includes('mist') || weatherType.includes('fog')) {
    backgroundClass = 'foggy-bg';
  } else {
    backgroundClass = 'default-bg';
  }

  return (
    <div className={`container ${backgroundClass}`}>

    
    

    
      <div className='city'>
        <input
          type='text'
          value={city}
          onChange={handleOnChange}
          placeholder='Enter any city name'
        />
        <button onClick={fetchData}>
          <FaSearch className='search' />
        </button>
      </div>
        {!weather && !error && (
        <h1 className='app-title'>WeatherCraft</h1>
       )}
  {!weather && !error && (
         <img src="/mainlogo.png"  alt="House image" height={50} width={50} />
       )}

      {/* ⚠️ Error Message */}
      {error && <p className='error-message'>{error}</p>}

      {/* 🌦️ Weather Content */}
      {weather && weather.weather && (
        <div className='content'>
          <div className='weather-image'>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt='weather icon'
            />
            <h3 className='desc'>{weather.weather[0].description}</h3>
          </div>

          <div className='weather-temp'>
            <h2>{weather.main.temp}<span>&deg;C</span></h2>
          </div>

          <div className='weather-city'>
            <div className='location'>
              <MdLocationOn />
            </div>
            <p>{weather.name}, <span>{weather.sys.country}</span></p>
          </div>

          <div className='weather-stats'>
            <div className='wind'>
              <FaWind className='wind-icon' />
              <h3 className='wind-speed'>{weather.wind.speed}<span> Km/h</span></h3>
              <h3 className='wind-heading'>Wind Speed</h3>
            </div>
            <div className='humidity'>
              <WiHumidity className='humidity-icon' />
              <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
              <h3 className='humidity-heading'>Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather;
