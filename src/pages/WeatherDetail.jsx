import { useParams } from "react-router-dom";

const WeatherDetail = () => {
  const { city } = useParams();

  return <h1>Weather in {city}</h1>;
};

export default WeatherDetail;
