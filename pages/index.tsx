import Layout from '../components/layout';
import Footer from '../components/footer';
import styled from 'styled-components';
import React from 'react';
import { Weather, Results, Forecast } from './../interfaces/weather';
import WeatherCard from '../components/wheaterCard';

const Main = styled.main`
  min-height: calc(100vh - 64px);
  .white-text {
    color: #fff;
  }
`;

type Storage = {
  weather: Weather;
  date: Date;
};

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
      },
    }).then(async (response) => {
      const data = await response.json();
      const updatedWeather = data as Weather;
      setWeather(updatedWeather);
      setWeatherResults(updatedWeather.results);
      setWeatherForecast(updatedWeather.results.forecast);
      let storage = {
        weather: updatedWeather,
        date: new Date(),
      } as Storage;
      localStorage.setItem('weather', JSON.stringify(storage));
    });
  }

  return (
    <Main>
      <section className="container pt-3">
        <h2 className="white-text">{weatherResults.city_name}</h2>
        <p className="white-text"> {weatherResults.temp + ' ºC'}</p>

        <div className="row justify-content-center">
          {weatherForecast.map((forecast: Forecast) => {
            return (
              <div className="col-6 col-sm-4 col-md-2 my-3" key={forecast.id}>
                <WeatherCard forecast={forecast}></WeatherCard>
              </div>
            );
          })}
        </div>
      </section>
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
