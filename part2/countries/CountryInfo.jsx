const CountryInfo = ({ country, weather }) => {
    if(country === null || weather === null) {
        return null
    }

    const res = weather.weather.map(w => w.icon)

    return(
        <div>
            <h1>{country.name.common}</h1>
            Capital {country.capital}
            <br />
            Area {country.area}
            <h2>Languages</h2>
            <ul>
                {
                    Object.values(country.languages)
                        .map((lan, index) => {
                            return <li key={index}>{lan}</li>
                        })
                }
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${res[0]}.png`} alt="weather image"/>
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
};

export default CountryInfo;