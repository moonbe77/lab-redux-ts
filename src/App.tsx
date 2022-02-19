import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import TrendingMovies from "./features/movies/TrendingMovies";
import MovieDetails from "./features/activeMovie/MovieDetails";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./common/ErrorFallback";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
          <MovieDetails />
          <TrendingMovies />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
