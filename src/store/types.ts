export const SET_WEATHER = 'GET_WEATHER' as const;
export const SET_LOADING = 'SET_LOADING' as const;
export const SET_ERROR = 'SET_ERROR' as const;

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface MainWeatherData {
  dt: number;
  main: {
    temp: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    pressure: number;
    humidity: number;
    wind: number;
  };
  weather: Weather[];
  dt_txt: string;
}

export interface CityData {
  id: number;
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  weather: MainWeatherData[];
  city: CityData;
}

export interface WeatherError {
  message: string;
}

export interface WeatherState {
  data: WeatherData | null;
  isLoading: boolean;
  error: string;
}

interface GetWeatherAction {
  type: typeof SET_WEATHER;
  payload: WeatherData;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type WeatherAction = GetWeatherAction | SetLoadingAction | SetErrorAction;
