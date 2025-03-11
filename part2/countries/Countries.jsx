import { useEffect, useState } from "react";
import axios from 'axios';
import CountryInfo from './CountryInfo'

const api_key = import.meta.env.VITE_SOME_KEY

const Countries = () => {
    const [ value, setValue ] = useState('');
    const [ allCountries, setAllCountries ] = useState(null);
    const [ country, setCountry ] = useState(null)
    const [ name, setName ] = useState(null);
    const [ weather, setWeather ] = useState(null);

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setAllCountries(response.data)
            })
    }, [])

    useEffect(() => {
        if(name !== null) {
            axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                const data = response.data
                setCountry(data)
            })
            .catch(e => {
                console.log(e)
            })
        }
    }, [name])

    useEffect(() => {
        if(country !== null) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${api_key}`)
                .then(response => {
                    const data = response.data
                    setWeather(data)
                })
        }
    }, [country])

    if(!allCountries) return null;

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleCountry = (name) => {
        setName(name)
    }
    
    const searchList = allCountries.filter(country => 
            country.name.common.toLowerCase().includes(value.toLowerCase()))

    return(
        <div>
            find countries <input value={value} onChange={handleChange} />
            {searchList.length > 10 && <div>Too many matches, specify another filter</div>}
            {searchList.length <= 10 && searchList.
                map((item, index)=> {
                    return(
                        <div key={index}>
                            {item.name.common}
                            <button type="submit" onClick={() => handleCountry(item.name.common)}>show</button>
                        </div>
                        )
                })
            }
            {searchList.length !== 1 && <CountryInfo country={country} weather={weather} />}
            {searchList.length === 1 && searchList.map((item, index) => {
                return(
                    <div key={index}>
                        <h1>{item.name.common}</h1>
                        Capital {item.capital}
                        <br />
                        Area {item.area}
                        <h2>Languages</h2>
                        <ul>
                            {
                                Object.values(item.languages)
                                    .map((lan, index) => {
                                        return <li key={index}>{lan}</li>
                                })
                            }
                        </ul>
                        <img src={item.flags.png} alt={item.flags.alt} />
                    </div>
                )
            })} 
        </div>
    )
}

export default Countries;