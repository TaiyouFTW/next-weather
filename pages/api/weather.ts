import type { NextApiRequest, NextApiResponse } from 'next';
import { Weather } from './../../interfaces/weather';

export default async function WeatherAndForecast(request: NextApiRequest, response: NextApiResponse<Weather>) {
  if (request.method === 'GET') {
    let url = 'https://api.hgbrasil.com/weather';
    if (request.query.woeid !== '' || request.query.woeid !== null) {
      url += '?woeid=' + request.query.woeid;
    } else {
      url = 'https://api.hgbrasil.com/weather??woeid=449648';
    }
    const fetchWeather = await fetch(url);
    const weather = (await fetchWeather.json()) as Weather;
    weather.results.condition_slug = Slug(weather.results.condition_slug);
    for (let i = 0; i < weather.results.forecast.length; i++) {
      weather.results.forecast[i].id = i.toString();
      weather.results.forecast[i].condition = Slug(weather.results.forecast[i].condition);

      let futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + i);
      weather.results.forecast[i].date = futureDate.toLocaleDateString('pt-BR');
    }
    return response.json(weather);
  }
}

function Slug(conditionSlug: string) {
  switch (conditionSlug.toLowerCase()) {
    case 'storm':
      conditionSlug = 'cloud-showers-heavy';
      break;
    case 'snow':
      conditionSlug = 'snowflake';
      break;
    case 'hail':
      conditionSlug = 'snowflake';
      break;
    case 'rain':
      conditionSlug = 'cloud-rain';
      break;
    case 'fog':
      conditionSlug = 'smog';
      break;
    case 'clear_day':
      conditionSlug = 'sun';
      break;
    case 'clear_night':
      conditionSlug = 'moon';
      break;
    case 'cloud':
      conditionSlug = 'cloud';
      break;
    case 'cloudly_day':
      conditionSlug = 'cloud-sun';
      break;
    case 'cloudly_night':
      conditionSlug = 'cloud-moon';
      break;
  }
  return conditionSlug;
}
