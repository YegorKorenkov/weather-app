import React, { useEffect, useState } from 'react';
import DaysWeather from '../components/DaysWeather';
import DetailWeather from '../components/DetailWeather';
import ErrorMessage from '../components/ErrorMessage';
import MainWeather from '../components/MainWeather';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { MainWeatherData, WeatherData } from '../store/types';

const WeatherPage: React.FC = () => {
  const weatherData = useTypedSelector((state) => state.weather.data);
  const errorMessage = useTypedSelector((state) => state.weather.error);

  const [data, setData] = useState<WeatherData>();
  const [detailsDate, setDetailsDate] = useState<Date>();
  const [detailItems, setDetailItems] = useState<null | MainWeatherData[]>(null);

  useEffect(() => {
    if (weatherData) {
      setData(weatherData);
      setDetailsDate(new Date(weatherData.weather[0].dt_txt));
    }
  }, [weatherData]);

  useEffect(() => {
    if (data) {
      const currentData = data.weather.filter((item) => {
        return new Date(item.dt_txt).getDate() === detailsDate?.getDate();
      });
      if (currentData) setDetailItems(currentData);
    }
  }, [detailsDate, data]);

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <div>
      {data && (
        <>
          <MainWeather data={data} />
          <DaysWeather
            data={data?.weather}
            setDetailsDate={(data) => setDetailsDate(new Date(data))}
          />
          <DetailWeather data={detailItems} />
        </>
      )}
    </div>
  );
};

export default WeatherPage;
