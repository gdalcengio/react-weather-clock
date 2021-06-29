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
    this.setState(
      {
        time: e.target.value,
        readableTime: e.target.options[e.target.selectedIndex].text,
      },
      this.updateCards //callback
    );
  };

  updateCards = () => {
    fetch(`http://localhost:3001?city=${this.state.city}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //need to filter from 40 3 hour interval entries down to 5
        const filteredData = data.list.filter((listItem) =>
          // listItem.dt_txt.includes("15:00:00")
          listItem.dt_txt.includes(this.state.time)
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
      <Card listItem={listItem} key={i} time={this.state.readableTime} />
    ));
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
            <option value="00:00:00">Midnight</option>
            <option value="03:00:00">3 am</option>
            <option value="06:00:00">6 am</option>
            <option value="09:00:00">9 am</option>
            <option value="12:00:00">Noon</option>
            <option value="15:00:00">3 pm</option>
            <option value="18:00:00">6 pm</option>
            <option value="21:00:00">9 pm</option>
          </select>
        </div>

        <div className="weather-bar">{this.formatCards()}</div>
      </div>
    );
  }
}

export default Weather;
