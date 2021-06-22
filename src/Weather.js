import React from "react";
import "./weather.css";

const api = {
  key: "0cda82f90f0840d9bb26a75c6f1d948f",
  base: "https://api.openweathermap.org/data/2.5/forecast",
};

const getWeatherData = async () => {
  const cityName = "Surrey";
  try {
    const resp = await fetch(api.base + "?q=" + cityName + "&appid=" + api.key);
    const data = await resp.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

function Card(props) {
  return (
    <div className="weather-card">
      <h2>{props.day}</h2>
      <img src={props.thumbnail} alt="thumbnail"></img>
      <p>{props.degrees}</p>
      <p>{props.status}</p>
    </div>
  );
}

function Weather() {
  const day = "mon";
  const degrees = 0;
  const status = "status";
  const thumbnail = " ./thumbnail";

  getWeatherData().then((result) => console.log(result));

  return (
    <div className="weather-bar">
      <Card day={day} thumbnail={thumbnail} status={status} degrees={degrees} />
    </div>
  );
}

export default Weather;
