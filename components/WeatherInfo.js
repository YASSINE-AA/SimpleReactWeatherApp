import React, {useEffect, useState} from 'react';
import axios from 'axios';



const WeatherInfo = (props) =>{
    const [location, setLocation] = useState("Enter a city");
    const [data, setData] = useState({});
    const [obj, setObj] = useState({"weather": {0: {"description": ""}}, "main": {"temp": ""}});
    const apiKey = "2d195320deb6060d2f817f29b65eed71"; // Enter your API Key (https://openweathermap.org/api).
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`   
    
;

    const searchLocation = async (event) => {
      if(event.key === 'Enter') {
        axios.get(url).then((res) => {
          setData(res.data);
          console.log(res.data);
        }).catch((err) => console.error(err));
      }
    }
    

    useEffect(()=> {
      if(Object.keys(data).length !== 0) {
        let string = JSON.stringify(data);
        let objectValue = JSON.parse(string);
        setObj(objectValue);
      }
    }, [data]);


    
    
    return(
    <div className='weatherContent'>
    <input placeholder= "Enter a city" className='inputClass' onChange={event => setLocation(event.target.value)} onKeyDown={searchLocation}>
          </input>
          <h1>{obj["weather"][0]["description"]}</h1>
          <h1 id="temp">{parseInt(obj["main"]["temp"]) - 273}°C</h1>
          <h1>Feels Like: {parseInt(obj["main"]["feels_like"]) - 273}°C</h1>
    </div>

    );
}


export default WeatherInfo;