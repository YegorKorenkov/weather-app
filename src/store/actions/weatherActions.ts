import { Dispatch } from 'redux';
import { fetchWeather } from '../../api/fetchWeather';
import { getMainWeatherDataPayload } from '../../dto/weather';
import { getWeather, setError, setLoading } from './actionCreators';

export const setWeather = (city: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading());

    const resData = await fetchWeather(city);

    const payload = getMainWeatherDataPayload(resData);

    dispatch(getWeather(payload));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
