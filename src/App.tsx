import React from 'react';
import './App.css';
import Loader from './components/Loader';
import Search from './components/Search';
import { useTypedSelector } from './hooks/useTypedSelector';
import WeatherPage from './pages/WeatherPage';
import './styles/main.scss';

const App: React.FC = () => {
  const isLoading = useTypedSelector((state) => state.weather.isLoading);

  return (
    <div className="page-container">
      <Search />
      {isLoading ? <Loader /> : <WeatherPage />}
    </div>
  );
};

export default App;
