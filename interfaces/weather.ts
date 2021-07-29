export interface Weather {
  by: string;
  valid_key: boolean;
  results: Results;
  execution_time: number;
  from_cache: boolean;
}

export interface Results {
  temp: number;
  date: string;
  time: string;
  condition_code: string;
  description: string;
  currently: string;
  cid: string;
  city: string;
  img_id: string;
  humidity: number;
  wind_speedy: string;
  sunrise: string;
  sunset: string;
  condition_slug: string;
  city_name: string;
  forecast: Forecast[];
}

export interface Forecast {
  id: string;
  date: string;
  weekday: string;
  max: number;
  min: number;
  description: string;
  condition: string;
}
