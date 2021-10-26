import { ActionTypes } from '../actions/actionTypes';
import { WeatherState, WeatherAction, SET_WEATHER, SET_LOADING, SET_ERROR } from '../types';

const initialState: WeatherState = {
  data: null,
  isLoading: false,
  error: '',
};

export default (state = initialState, action: ActionTypes): WeatherState => {
  switch (action.type) {
    case SET_WEATHER:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: '',
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
