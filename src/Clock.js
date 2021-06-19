import React, { Component } from "react";

import "./Clock.css";

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

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date(),
    });
  }
  render() {
    const day = this.state.date.getDay(); //get day
    const month = this.state.date.getMonth(); //get month
    const monthDays = this.state.date.getDate(); //get day in month 0-31
    const year = this.state.date.getFullYear();

    let ending = "th";

    if (monthDays === 1) {
      ending = "st";
    } else if (monthDays === 2) {
      ending = "nd";
    } else if (monthDays === 3) {
      ending = "rd";
    }

    return (
      <div className="clock">
        <p>
          {days[day]}, {months[month]} {monthDays}
          {ending}, {year}
        </p>
        <h1>It is currently: {this.state.date.toLocaleTimeString()}.</h1>
      </div>
    );
  }
}

export default Clock;
