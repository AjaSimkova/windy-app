import { useState } from "react";
import useWeather from "./hooks/useWeather";

function App() {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(undefined);
  const [lon, setLon] = useState(undefined);
  const { data, loading, error } = useWeather(lat, lon);

  const call = async () => {
    if (city === "") {
      alert("Prosím vyplňte");
      return;
    }
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=5d2657a3b959664b375a0195e8082de9`
    );
    const data = await res.json();
    if (data) {
      if (data[0]?.lat === undefined) {
        alert("chyba");
        return;
      }
      setLat(data[0].lat);
      setLon(data[0].lon);
    }
  };

  if (loading) return <p>Loading......</p>;
  if (error) return <p>Error.....</p>;
  return (
    <>
      <div className="flex items-center justify-center flex-col m-20 bg-gray-200">
        <h1 className="text-8xl">Windy App</h1>
        <div className="flex my-5 gap-2 justify-center">
          <input
            //formulářový element
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="London"
            className="border-[1px] border-gray-800 p-3 "
          />
          <button
            onClick={call}
            className="bg-blue-700 text-white px-5 py-1 rounded-sm"
          >
            Search
          </button>
        </div>
        <p>{data.name}</p>
        <p>{(data.main.temp - 272.15).toFixed(2)}C</p>
        <p>{data.weather[0].description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        />
      </div>
    </>
  );
}

export default App;
