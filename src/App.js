import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './Components/TopButtons';
import Inputs from './Components/Inputs';
import TimeAndLocation from './Components/TimeAndLocation';
import TemperatureAndDetails from './Components/TemperatureAndDetails';
import Forcast from './Components/Forcast';
// import getWeatherData from './Services/WeatherServises';
import getFomattdWeatherData from '../src/Services/WeatherServises';
import {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const [query , setQuery] = useState({q: 'berlin'});
    const [units , setUnits] = useState('metric');
    const [weather , setWeather] = useState(null);

    useEffect(() => {
      const fetchWeather = async () => {
        const message = query.q ? query.q : 'current location';
        toast.info('feching weather for ' + message);
        await getFomattdWeatherData({...query, ...units}).then(data => {
          setWeather(data);
          toast.success(`Succesfully fetched weather for ${data.name}, ${data.country}`);
        });
        
      };
      fetchWeather();
    }, [query , units]);

    const formatBackground = () => {
      if(!weather) return 'from-cyan-700 to-blue-700';
      const treshold = units === 'metric' ? 20 : 80;

      if(weather.temp <= treshold) return 'from-cyan-700 to-blue-700';

      return 'from-yellow-700 to-orange-700';
    };
    
  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br
      from-cyan-700 to-blue-700
      sadow-xt shadow-gray-400  ${formatBackground}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs units={units} setUnits={setUnits} setQuery={setQuery} />
      {weather && (
        <div>        
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forcast title='hourly forecast' items={weather.hourly} />
          <Forcast title='daily forecast' items={weather.daily} />
        </div>
      )}
      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />
    </div>
  );
}

export default App;
