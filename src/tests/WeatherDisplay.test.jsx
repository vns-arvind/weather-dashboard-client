import { render, screen } from "@testing-library/react";
import WeatherDisplay from "../components/WeatherDisplay";

const mockWeather = {
  name: "London",
  main: { temp: 20, humidity: 65 },
  wind: { speed: 5 },
  weather: [{ icon: "01d", description: "clear sky" }],
};

test("renders weather info", () => {
  render(<WeatherDisplay weather={mockWeather} />);
  expect(screen.getByText("London")).toBeInTheDocument();
  expect(screen.getByText(/Temp:/)).toBeInTheDocument();
  expect(screen.getByText(/Humidity:/)).toBeInTheDocument();
});
