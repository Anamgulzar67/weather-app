import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const getWeather = async () => {
    const api_key = "57c0b82a93874a979a662203232112";
    const api_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`;

    if (location) {
      try {
        const res = await fetch(api_url);
        const data = await res.json();
        if (data) {
          const api_data = {
            country: data.location.country,
            city: data.location.name,
            temp: data.current.temp_f,
            humidity: data.current.humidity,
            wind: data.current.wind_mph,
            gust: data.current.gust_mph,
            visibility: data.current.visibility_miles,
            condition: data.current.condition.text,
            img: data.current.condition.icon,
          };
          setWeather(
            <>
              <div className="text-center text-2xl ">{api_data.city}</div>
              <div className="flex justify-center">
                <div className="flow-root">
                  <div className="float-left">
                    <img
                      src={api_data.img}
                      width={80}
                      height={80}
                      alt="condition"
                    />
                  </div>
                  <div className="float-left my-2 text-6xl degrees">
                    {api_data.temp}
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-400  my-2">
                {api_data.condition}
              </div>
              <div className="float-root p-2 my-4">
                <div className="float-left text-gray-400">
                  Humidity: {api_data.humidity}%
                </div>
                <div className="float-right text-gray-400">
                  Wind:{api_data.wind} mph
                </div>
                <div className="float-left text-gray-400">
                  Visibility:{api_data.visibility} mi
                </div>

                <div className="float-right text-gray-400">
                  Gust:{api_data.gust} mph
                </div>
              </div>
            </>
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <h1 className="text-center text-6xl text-white my-8">Weather App</h1>
      <nav className="flex items-center justify-center py-4 bg-gray-600 w-2/4 my-8 m-auto opacity-90 border border-x-neutral-600">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"></path>
            </svg>
          </div>
          <input
            onChange={(e) => setLocation(e.target.value)}
            className="block rounded-lg border-slate-400 opacity-80 pl-10 p-4"
            type="text"
            value={location}
            id="location"
            placeholder="Location(i.e Islamabad)"
          />
        </div>
        <button
          onClick={getWeather}
          className="bg-blue-600 text-white hover:bg-blue-800  font-bold m-2 px-8 py-4 rounded-lg"
          id="search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 24 24"
           
          >
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
          <span className="sr-only">search</span>
        </button>
      </nav>
      {weather && (
        <div className="flex w-full p-10  justify-center ">
          <div className="w-full max-w-xs ">
            <div className="mb-2">
              <div className="bg-black rounded-xl text-white shadow-lg rounded-4xl px-8 pt-6 pb-8 mb-4 opacity-80">
                {weather}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
