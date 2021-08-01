import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/Weather";

const API_KEY = "608dfeb62774bca0da0f013d1f238c5b";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    pressure: undefined,
    error: undefined,
  };

  gettingWeather = async (e) => {
    e.preventDefault();
    var city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await api_url.json();
      var timezone = data.timezone * 1000;

      var sunrise = data.sys.sunrise;
      var date2 = new Date();
      date2.setTime(sunrise * 1000 + timezone - 3600000 * 3);
      console.log(date2);
      var sunriseHours = date2.getHours();
      var sunriseMinutes = date2.getMinutes();
      var sunriseSeconds = date2.getSeconds();
      if (sunriseHours < 10) {
        sunriseHours = "0" + sunriseHours;
      }
      if (sunriseMinutes < 10) {
        sunriseMinutes = "0" + sunriseMinutes;
      }
      if (sunriseSeconds < 10) {
        sunriseSeconds = "0" + sunriseSeconds;
      }
      var sunrise_date = sunriseHours + ":" + sunriseMinutes + ":" + sunriseSeconds;

      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset * 1000 + timezone - 3600000 * 3);
      var sunsetHours = date.getHours();
      var sunsetMinutes = date.getMinutes();
      var sunsetSeconds = date.getSeconds();
      if (sunsetHours < 10) {
        sunsetHours = "0" + sunsetHours;
      }
      if (sunsetMinutes < 10) {
        sunsetMinutes = "0" + sunsetMinutes;
      }
      if (sunsetSeconds < 10) {
        sunsetSeconds = "0" + sunsetSeconds;
      }
      var sunset_date = sunsetHours + ":" + sunsetMinutes + ":" + sunsetSeconds;

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunrise: sunrise_date,
        sunset: sunset_date,
        pressure: data.main.pressure,
        error: undefined,
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        pressure: undefined,
        error: "Введите название города",
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  pressure={this.state.pressure}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
