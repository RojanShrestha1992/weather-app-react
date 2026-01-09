import React, { useEffect, useState } from "react";
// import "./styles/style.css";
// import "./styles/weather.css";

export default function Home() {
  const [cityInfo, setCityInfo] = useState(null);
  const [cityCountry, setCityCountry] = useState(null);
  const [cityName, setCityName] = useState(null);
  // const [cityClass, setCityClass] = useState(null);

  const [search, setSearch] = useState("Kathmandu");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=d1d4a90c7eee60843293b5b389f469d3`;
      const response = await fetch(url);
      // console.log(response);
      const resJson = await response.json();
      console.log(resJson);
      setCityInfo(resJson.main);

      setCityCountry(resJson.sys);
      setCityName(resJson);
      // setCityClass(resJson);

      // setCity(resJson.sys);
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputField"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {!cityInfo ? (
          <div className="error-box">
            <p className="error"> No data found</p>
          </div>
        ) : (
          <div>
            <div className="weather">
              <div
                className={`${cityName.weather[0].main}`}
                id="weather-icon"
              ></div>
              <p>{cityName.weather[0].main}</p>
            </div>
            <div className="info">
              <h2 className="location">
                <i className="bx bx-street-view"></i>
                {cityName.name},{cityCountry.country}
              </h2>

              <h1 className="temp">{cityInfo.temp}°C</h1>
              <div>
                <h2 className="min-max">Feels Like {cityInfo.feels_like}</h2>
                <h3 className="min-max">
                  Min: {cityInfo.temp_min}°C | Max:{cityInfo.temp_max}°C
                </h3>
              </div>
            </div>
            {/* <div className="circle"></div> */}
          </div>
        )}
      </div>
    </>
  );
}
