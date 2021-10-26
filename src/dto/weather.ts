export const getMainWeatherDataPayload = (data: any) => {
  const mainWeatherData = data.list.map((list: any) => {
    return {
      dt: list.dt,
      main: {
        temp: Math.round(list.main.temp),
        feelsLike: Math.round(list.main.feels_like),
        tempMin: Math.round(list.main.temp_min),
        tempMax: Math.round(list.main.temp_max),
        pressure: list.main.pressure,
        humidity: list.main.humidity,
        wind: list.wind.speed,
      },
      weather: list.weather,
      dt_txt: list.dt_txt,
    };
  });
  const cityData = {
    id: data.city.id,
    name: data.city.name,
    country: data.city.country,
    sunrise: data.city.sunrise,
    sunset: data.city.sunset,
  };

  const payload = {
    weather: mainWeatherData,
    city: cityData,
  };
  return payload;
};
