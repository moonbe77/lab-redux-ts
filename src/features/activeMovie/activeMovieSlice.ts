import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Movie } from "../movies/moviesSlice";

export interface ActiveMovieStateProps {
	activeMovie: Movie | null;
	show: boolean;
}

const initialState: ActiveMovieStateProps = {
	activeMovie: null,
	show: false,
};

export const ActiveMovieSlice = createSlice({
	name: "activeMovie",
	initialState,
	reducers: {
		setActiveMovie: (state, action: PayloadAction<Movie>) => {
			state.activeMovie = action.payload;
			state.show = true;
		},
		setShow: (state, action: PayloadAction<boolean>) => {
			state.show = false;
			// state.activeMovie = null;
		},
	},
});

export const setActiveMovie =
	(movie: Movie): AppThunk =>
	async (dispatch) => {
		dispatch(ActiveMovieSlice.actions.setActiveMovie(movie));
	};

export const resetState =
	(value: boolean): AppThunk =>
	async (dispatch) => {
		dispatch(ActiveMovieSlice.actions.setShow(value));
	};

export const ActiveMovieState = (state: RootState) => state.activeMovie;
export default ActiveMovieSlice.reducer;
