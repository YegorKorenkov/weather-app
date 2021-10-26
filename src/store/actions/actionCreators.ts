import { SET_ERROR, SET_LOADING, SET_WEATHER, WeatherData } from '../types';

export const getWeather = (data: WeatherData) => ({
  type: SET_WEATHER,
  payload: data,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setError = (message: string) => ({
  type: SET_ERROR,
  payload: message,
});
