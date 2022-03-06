import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { searchMovies } from "../movies/moviesAPI";
import { tmdbApiResponse, ApiError } from "../movies/moviesSlice";

export interface SearchState {
	search: tmdbApiResponse;
	status: "idle" | "loading" | "failed";
	error: ApiError | null;
}

const initialState: SearchState = {
	search: {
		page: 0,
		results: [],
		total_pages: 0,
		total_results: 0,
	},
	status: "idle",
	error: null,
};

export const searchMovie = createAsyncThunk(
	"movies/search",
	async (param: string, { rejectWithValue }) => {
		const response = await searchMovies(param);
		if (response.success === false) {
			return rejectWithValue(response);
		}
		return response;
	},
);

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<tmdbApiResponse>) => {
			state.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(searchMovie.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(searchMovie.fulfilled, (state, action) => {
			state.search = { ...action.payload };
			state.status = "idle";
			state.error = null;
		});
		builder.addCase(
			searchMovie.rejected,
			(state, action: PayloadAction<{} | ApiError | any>) => {
				state.status = "failed";
				state.error = action.payload;
			},
		);
	},
});

export const searchState = (state: RootState) => state;
export default searchSlice.reducer;
