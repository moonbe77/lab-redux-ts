import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import moviesReducer from "../features/movies/moviesSlice";
import activeMovieReducer from "../features/activeMovie/activeMovieSlice";
import searchReducer from "../features/searchMovies/searchSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		movies: moviesReducer,
		activeMovie: activeMovieReducer,
		search: searchReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
