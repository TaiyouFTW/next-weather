import Layout from '../components/layout';
import Footer from '../components/footer';
import styled from 'styled-components';
import React from 'react';
import { Weather, Results, Forecast } from './../interfaces/weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-common-types';

const Main = styled.main`
 min-height: calc(100vh - 64px);
`;

const WeatherCard = styled.div`
  background: rgb(255 255 255 / 40%);
  -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
  :hover {
    -webkit-box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  }

  .card-icon {
    height: 5em;
  }
`;

type Storage = {
  weather: Weather;
  date: Date;
}


export default function Home() {
  const [weather, setWeather] = React.useState({} as Weather);
  const [weatherResults, setWeatherResults] = React.useState({} as Results);
  const [weatherForecast, setWeatherForecast] = React.useState(Array<Forecast>());

  React.useEffect(() => {
    let weatherStorage = localStorage.getItem('weather');
    if (weatherStorage) {
      const weatherData = JSON.parse(weatherStorage) as Storage;
      const storageDate = new Date(weatherData.date);
      const today = new Date();
      let hours = Math.floor(Math.abs(storageDate.getTime() - today.getTime()) / 36e5);
      console.log('hours', hours);
      if (hours > 6) {
        getWeather();
      } else {
        setWeather(weatherData.weather);
        setWeatherResults(weatherData.weather.results);
        setWeatherForecast(weatherData.weather.results.forecast);
      }
    } else {
      getWeather();
    }
  }, []);

  function getWeather() {
    fetch('/api/weather', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async (response) => {
        const data = await response.json();
        const updatedWeather = data as Weather;
        setWeather(updatedWeather);
        setWeatherResults(updatedWeather.results);
        setWeatherForecast(updatedWeather.results.forecast);
        let storage = {
          weather: updatedWeather,
          date: new Date()
        } as Storage;
        localStorage.setItem('weather', JSON.stringify(storage));
      })
  }

  return (
    <Main>
      <div className="container pt-3">
        <h2 className="text-white">{weatherResults.city_name}</h2>
        <p className="text-white"> {weatherResults.temp + ' ºC'}</p>

        <div className="row justify-content-center">
          {weatherForecast.map((forecast) => {
            return (
              <div className="col-6 col-sm-4 col-md-2 my-3" key={forecast.id}>
                <WeatherCard className="rounded-3 py-4 px-4">
                  <FontAwesomeIcon icon={forecast.condition !== null ? forecast.condition as IconName : 'circle'} className="card-icon w-auto mx-auto d-block pb-3" />
                  <p className="text-center mb-3">{forecast.date}</p>
                  <div className="d-flex justify-content-around mb-3">
                    <span className="text-center">Min <br />{forecast.min + ' ºC'}</span>
                    <span className="text-center">Max <br />{forecast.max + ' ºC'}</span>
                  </div>
                </WeatherCard>
              </div>
            );
          })}
        </div>
      </div>
    </Main>
  );
}

Home.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      {page}
      <Footer />
    </Layout>
  );
};
