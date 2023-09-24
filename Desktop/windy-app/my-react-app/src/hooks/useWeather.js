import React, { useEffect, useState } from "react";

const useWeather = (lat, lon) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5d2657a3b959664b375a0195e8082de9`
        );

        const weather = await res.json();
        setData(weather);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    if (lat === undefined || lon === undefined) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            void getData(position.coords.latitude, position.coords.longitude);
          },
          () => setError("Unable to retrieve location")
        );
      }
    } else {
      void getData(lat, lon);
    }
  }, [lat, lon]);
  return { data, loading, error };
};

export default useWeather;
