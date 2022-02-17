import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchTrending } from "./moviesAPI";

export interface tmdbApiResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Array<Movie>;
}
export enum PeriodType {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
  ALL = "all",
}

export interface MovieState {
  trending: tmdbApiResponse;
  status: "idle" | "loading" | "failed";
}

export interface TrendingPeriod {
  param: PeriodType;
}

export interface Movie {
  vote_count: number;
  vote_average: number;
  overview: string;
  original_title: string;
  poster_path: string;
  video: boolean;
  adult: boolean;
  backdrop_path: string;
  release_date: string;
  genre_ids: any; // add genres enum
  title: string;
  original_language: string;
  id: number;
  popularity: string;
  media_type: string;
}

const initialState: MovieState = {
  trending: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  status: "idle",
};

export const fetchTrendingAction = createAsyncThunk(
  "movies/fetchTrending",
  async () => {
    const response = await fetchTrending();
    return response;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setTrending: (state, action: PayloadAction<tmdbApiResponse>) => {
      state.trending = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingAction.pending, (state) => {
      state.trending = {
        ...initialState.trending,
      };
      state.status = "loading";
    });
    builder.addCase(fetchTrendingAction.fulfilled, (state, action) => {
      state.trending = action.payload;
      state.status = "idle";
    });
  },
});

export const { setTrending } = moviesSlice.actions;
export const selectTrending = (state: RootState) => state.movies.trending;
export const selectStatus = (state: RootState) => state.movies.status;
export default moviesSlice.reducer;
