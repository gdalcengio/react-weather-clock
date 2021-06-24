import React from "react";
import "./weather.css";

// const getWeatherData = async () => {
//   const cityName = "Surrey";
//   try {
//     const resp = await fetch(api.base + "?q=" + cityName + "&appid=" + api.key);
//     const data = await resp.json();

//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

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

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: "mon",
      degrees: 0,
      status: "status",
      thumbnail: "./thumbnail",
    };
  }

  //change to onsearchbarkeychange later
  componentDidMount() {
    // const cityName = "Surrey"; // not BC in GB hahaha either way its a test
    //fetch url will become "http://localhost:3001" to avoid conflict with 3000
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.log);
  }

  //   const day = "mon";
  //   const degrees = 0;
  //   const status = "status";
  //   const thumbnail = " ./thumbnail";

  //   getWeatherData().then((result) => console.log(result));
  render() {
    return (
      <div className="weather-bar">
        <Card
          day={this.state.day}
          thumbnail={this.state.thumbnail}
          status={this.state.status}
          degrees={this.state.degrees}
        />
      </div>
    );
  }
}

export default Weather;
