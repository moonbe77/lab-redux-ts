import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import TrendingMovies from "./features/movies/TrendingMovies";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          width={50}
          height={50}
        />
        <span>LAB REDUX + TS</span>
      </header>
      <main className="app-main">
        {/* <Counter /> */}
        <TrendingMovies />
      </main>
    </div>
  );
}

export default App;
