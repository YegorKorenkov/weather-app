import React, { Component, ComponentType, FC, useEffect, useState, ReactElement } from 'react';
import { MainWeatherData, WeatherData } from '../store/types';
import { ReactComponent as FeelsLikeIcon } from '../assets/icons/feelsLike.svg';
import { ReactComponent as WindIcon } from '../assets/icons/wind.svg';
import { ReactComponent as HumidityIcon } from '../assets/icons/humidity.svg';
import { ReactComponent as PressureIcon } from '../assets/icons/pressure.svg';

interface MainWeatherProps {
  data: WeatherData | undefined;
}

const icons: Record<'feelsLike' | 'wind' | 'humidity' | 'pressure', ReactElement> = {
  feelsLike: <FeelsLikeIcon />,
  wind: <WindIcon />,
  humidity: <HumidityIcon />,
  pressure: <PressureIcon />,
};

type DetailTypes = {
  feelsLike: string[];
  wind: string[];
  humidity: string[];
  pressure: string[];
};
const currentDetail: DetailTypes = {
  feelsLike: ['Чувствуется как', `\u00B0C`],
  wind: ['Ветер', 'км/ч'],
  humidity: ['Влажность', '%'],
  pressure: ['Давление', 'мбар'],
};
type T = keyof DetailTypes;

const MainWeather: React.FC<MainWeatherProps> = ({ data }) => {
  const [details, setDetails] = useState<T[]>([]);
  const mainData: MainWeatherData | undefined = data?.weather[0];
  const iconUrl = `http://openweathermap.org/img/w/${mainData?.weather[0].icon}.png`;

  useEffect(() => {
    if (mainData) {
      const detailsNames = Object.keys(mainData.main).filter((item) => !item.includes('temp'));
      setDetails(detailsNames as T[]);
    }
  }, [data, mainData]);

  const stringCapitalized = (string: string | undefined) => {
    if (string) {
      return string[0].toUpperCase() + string.slice(1);
    }
  };

  return (
    <div className="container">
      <div className="main-weather">
        <div className="main-weather__title">
          <p>
            {data?.city.name}, {data?.city.country}
          </p>
          <p className="last-update">Последнее обновление {mainData?.dt_txt}</p>
        </div>

        <div className="main-weather__container">
          <div className="main-weather__temp">
            <img src={iconUrl} alt="weather" />
            <span>{mainData?.main.temp}&deg;С</span>
          </div>

          <div className="main-weather__description">
            <p>{stringCapitalized(mainData?.weather[0].description)}</p>
            <p>Наибольшая температура за день {mainData?.main.tempMax}&deg;</p>
          </div>
        </div>

        <div className="main-weather__details">
          {details.map((detail) => (
            <div className="main-weather__details-item" key={detail}>
              <span>{icons[detail]}</span>
              <div>
                <p>{currentDetail[detail][0]}</p>
                <p>
                  {mainData?.main[detail]}
                  <span>{currentDetail[detail][1]}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainWeather;
