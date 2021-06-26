import React from "react";
import "./weather.css";
import "./css/weather-icons.css";

//for the dates
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Card(props) {
  //day - given epoch unix seconds, needs milliseconds
  let date = new Date(props.listItem.dt * 1000);

  //thumbnail - referenced from https://erikflowers.github.io/weather-icons/
  const thumb = `wi wi-owm-${props.listItem.weather[0].id}`;

  return (
    <div className="weather-card">
      <p>
        {days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}
      </p>
      {/* <h2>{days[date.getDay()]}</h2> */}
      <h1>{props.listItem.main.temp}°C</h1>
      <i className={thumb}></i>
      <p>{props.listItem.weather[0].description}</p>
    </div>
  );
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   day: "mon",
      //   degrees: 0,
      //   status: "status",
      //   thumbnail: "./thumbnail",
      weekdayData: [],
    };
  }

  //change to onsearchbarkeychange later
  componentDidMount = () => {
    // const cityName = "Surrey"; // not BC in GB hahaha either way its a test
    //fetch url will become "http://localhost:3001" to avoid conflict with 3000
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //need to filter from 40 3 hour interval entries down to 5
        const filteredData = data.list.filter((listItem) =>
          listItem.dt_txt.includes("15:00:00")
        );
        this.setState(
          {
            weekdayData: filteredData,
          },
          () => console.log(this.state)
        );
      })
      .catch(console.log);
  };

  formatCards = () => {
    return this.state.weekdayData.map((listItem, i) => (
      <Card listItem={listItem} key={i} />
    ));
  };

  //   getWeatherData().then((result) => console.log(result));
  render() {
    return <div className="weather-bar">{this.formatCards()}</div>;
  }
}

export default Weather;
