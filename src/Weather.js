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
      <p>{props.time}</p>
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
      city: "Vancouver",
      time: "15:00:00",
      readableTime: "3 pm",
      data: {},
      weekdayData: [],
    };
    // this.handleEnterPress = this.handleEnterPress.bind(this); not necessary when accessing via this?
  }

  handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      //in case no value
      if (e.target.value === "") {
        this.updateCards();
        return;
      }

      this.setState(
        {
          city: e.target.value,
        },
        this.updateCards //callback
      );
    }
  };

  handleTimeChange = (e) => {
    // const localTime = e.target.options[e.target.selectedIndex].text;
    const time = parseInt(e.target.value);
    const localTime = `${time / 60 / 60}:00:00`;
    const convertedTime = new Date(
      (time + this.state.data.city.timezone) * 1000
    );
    this.setState(
      {
        time: localTime.toString(),
        readableTime: convertedTime.toLocaleTimeString(),
      },
      this.updateCards //callback
    );
  };

  updateCards = () => {
    fetch(`http://localhost:3001?city=${this.state.city}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        var filteredData = null;
        if (data.list !== undefined) {
          //need to filter from 40 3 hour interval entries down to 5
          filteredData = data.list.filter((listItem) =>
            listItem.dt_txt.includes(this.state.time)
          );
        }
        this.setState(
          {
            data: data,
            weekdayData: filteredData,
          },
          () => console.log(this.state)
        );
      })
      .catch(console.log);
  };

  formatCards = () => {
    if (this.state.weekdayData === null) {
      return <p>City could not be found</p>;
    } else {
      return this.state.weekdayData.map((listItem, i) => (
        <Card listItem={listItem} key={i} time={this.state.readableTime} />
      ));
    }
  };

  componentDidMount = () => {
    this.updateCards();
  };

  render() {
    return (
      <div className="weather">
        <div className="options">
          <input
            type="text"
            placeholder="Vancouver"
            onKeyDown={(e) => this.handleEnterPress(e)}
          ></input>

          <select
            name="times"
            id="names"
            onChange={(e) => this.handleTimeChange(e)}
            defaultValue={this.state.time}
          >
            <option value="0">Midnight</option>
            <option value="10800">3 am</option>
            <option value="21600">6 am</option>
            <option value="32400">9 am</option>
            <option value="43200">Noon</option>
            <option value="54000">3 pm</option>
            <option value="64800">6 pm</option>
            <option value="75600">9 pm</option>
          </select>
          <p>GMT</p>
        </div>

        <div className="weather-bar">{this.formatCards()}</div>
      </div>
    );
  }
}

export default Weather;
