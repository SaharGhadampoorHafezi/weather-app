import React, { useState } from 'react'
import { formatToLocalTime } from '../Services/WeatherServises';

const TimeAndLocation = ({weather: {dt, timezone, name, country}}) => {
  return (
    <div>
        <div className='justify-center items-center flex my-6'>
            <p className='text-white text-xl font-extralight'>
            {formatToLocalTime(dt, timezone)}
            </p>
        </div>
        <div className='justify-center items-center flex my-3'>
            <p className='text-white text-3xl font-medium'>
            {`${name}, ${country}`}
            </p>
        </div>
    </div>
  );
}

export default TimeAndLocation

