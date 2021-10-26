import clsx from 'clsx';
import React from 'react';
import { MainWeatherData } from '../store/types';

interface DetailWeatherProps {
  data: MainWeatherData[] | null;
}

const DetailWeather: React.FC<DetailWeatherProps> = ({ data }) => {
  return (
    <div className="detail-weather">
      <ul className="detail-weather__container">
        {data &&
          data.map((item, id) => (
            <li
              key={'detail' + item.dt_txt}
              className={clsx(
                id === 0 || id % 2 === 0
                  ? 'detail-weather__item dflex-column gradient-background'
                  : 'detail-weather__item dflex-column',
              )}>
              <div className="detail-weather__upper-block dflex-column">
                <p className="time">
                  {item.dt_txt.split(' ')[1].split(':').splice(0, 2).join(':')}
                </p>
                <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} />
                <p>{item.weather[0].description}</p>
              </div>
              <div className="detail-weather__lower-block dflex-column">
                <p className="temp">
                  {item.main.temp}
                  <span>&deg;C</span>
                </p>
                <p className="humidity">
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/drop-of-blood.png" />
                  {item.main.humidity}%
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DetailWeather;
