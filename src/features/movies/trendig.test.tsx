import React from "react";
import { render, screen, waitFor, cleanup } from "../../utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import TrendingMovies from "./TrendingMovies";

afterEach(cleanup);

const resp = {
	page: 1,
	total_results: 2,
	total_pages: 1,
	results: [
		{
			id: 1,
			title: "The Shawshank Redemption",
			overview: "Two imprisoned",
		},
		{
			id: 2,
			title: "The Godfather",
			overview: "Two imprisoned",
		},
	],
};

export const mockTrendingMovies = [
	rest.get(
		"https://api.themoviedb.org/3/trending/movie/day",
		(req: any, res: any, ctx: any) => {
			return res(ctx.json({ ...resp }), ctx.delay(500));
		},
	),
];

const server = setupServer(...mockTrendingMovies);
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("renders section title", () => {
	const { getByText } = render(<TrendingMovies />);
	expect(getByText(/TrendingMovies/i)).toBeInTheDocument();
});

test("render movies", async () => {
	render(<TrendingMovies />);
	expect(screen.getByText(/loading/i)).toBeInTheDocument();
	expect(screen.queryByText(/failed/i)).not.toBeInTheDocument();
	expect(screen.queryByText(/idle/i)).not.toBeInTheDocument();
	await waitFor(() => expect(screen.queryByText(/idle/i)).toBeInTheDocument());
	expect(screen.getAllByTestId("movie")).toHaveLength(2);
});

test("fail request", async () => {
	server.use(
		rest.get(
			"https://api.themoviedb.org/3/trending/movie/day",
			(req, res, ctx) => {
				return res(
					ctx.status(401),
					ctx.json({
						success: false,
						status_code: 401,
						status_message: "Invalid API key: You must be granted a valid key.",
					}),
				);
			},
		),
	);
	render(<TrendingMovies />);
	expect(screen.getByText(/loading/i)).toBeInTheDocument();
	await waitFor(() =>
		expect(screen.queryByText(/failed/i)).toBeInTheDocument(),
	);
	expect(
		screen.queryByText(/Invalid API key: You must be granted a valid key/i),
	).toBeInTheDocument();
});
