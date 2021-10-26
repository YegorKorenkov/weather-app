import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setWeather } from '../store/actions/weatherActions';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [alert, setAlert] = useState('');

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
    setAlert('');
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city.trim() === '') {
      return setAlert('Поле не может быть пустым!');
    }
    dispatch(setWeather(city));
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler} className="search-form">
        <div className="search-form__container">
          <input
            type="text"
            value={city}
            placeholder="Введите название города"
            onChange={changeHandler}
            className="search-form__input"
          />
          <button className="search-form__btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none">
              <path
                d="M5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.74832 10.5841 7.89951 9.88336 8.82257L14.0303 12.9697C14.3232 13.2626 14.3232 13.7374 14.0303 14.0303C13.7641 14.2966 13.3474 14.3208 13.0538 14.1029L12.9697 14.0303L8.82257 9.88336C7.89951 10.5841 6.74832 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0ZM5.5 1.5C3.29086 1.5 1.5 3.29086 1.5 5.5C1.5 7.70914 3.29086 9.5 5.5 9.5C7.70914 9.5 9.5 7.70914 9.5 5.5C9.5 3.29086 7.70914 1.5 5.5 1.5Z"
                fill="#919191"></path>
            </svg>
          </button>
        </div>
        {alert && <span className="search-form__alert">{alert}</span>}
      </form>
    </div>
  );
};

export default Search;
