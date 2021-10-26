import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { MainWeatherData } from '../store/types';

interface WeatherProps {
  data: MainWeatherData[] | undefined;
  setDetailsDate: (date: string) => void;
}

interface WeatherItem {
  dayTemp: number;
  nightTemp: number;
  icon: string;
  humidity: number;
  date: string;
}

const time = {
  day: 12,
  night: 0,
};

const DaysWeatherItem: React.FC<WeatherProps> = ({ data, setDetailsDate }) => {
  const [weatherItem, setWeatherItem] = useState<WeatherItem[]>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (data) {
      const currentData = data.filter((item) => {
        return (
          new Date(item.dt_txt).getHours() === time.day ||
          new Date(item.dt_txt).getHours() === time.night
        );
      });

      console.log(currentData);

      const itemsData = [];
      for (let i = 0; i < currentData.length; i = i + 2) {
        if (new Date(currentData[i].dt_txt).getHours() === time.night) {
          itemsData.push({
            dayTemp: currentData[i + 1].main.temp,
            nightTemp: currentData[i].main.temp,
            icon: currentData[i + 1].weather[0].icon,
            humidity: currentData[i].main.humidity,
            date: currentData[i].dt_txt,
          });
        } else {
          itemsData.push({
            dayTemp: currentData[i].main.temp,
            nightTemp: currentData[i + 1].main.temp,
            icon: currentData[i].weather[0].icon,
            humidity: currentData[i].main.humidity,
            date: currentData[i].dt_txt,
          });
        }
      }
      console.log(itemsData);
      setWeatherItem(itemsData);
    }
  }, [data]);

  const onClickHandler = (date: string, key: number) => {
    setActive(key);
    setDetailsDate(date);
  };

  return (
    <div>
      <ul className="days-cards">
        {weatherItem &&
          weatherItem.map((item, key) => (
            <li
              className={clsx('days-cards__item', active === key ? 'active' : '')}
              key={item.date}
              onClick={() => onClickHandler(item.date, key)}>
              <p className="days-cards__item--title">{item.date.split(' ')[0]}</p>

              <div className="days-cards__item--icon-body">
                <img src={`http://openweathermap.org/img/w/${item.icon}.png`} alt="icon" />
                <span>
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/drop-of-blood.png" />
                  {item.humidity}%
                </span>
              </div>
              <div className="days-cards__item--temp">
                <p className="days-cards__item--temp-day">{item.dayTemp}</p>
                <p className="days-cards__item--temp-night">{item.nightTemp}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DaysWeatherItem;
