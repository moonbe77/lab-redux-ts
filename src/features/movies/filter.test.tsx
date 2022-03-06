import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Filter from "./Filter";

enum PeriodType {
	DAY = "day",
	WEEK = "week",
	ALL = "all",
}

test("renders filters on screen", () => {
	const { getByText } = render(
		<Provider store={store}>
			<Filter values={PeriodType} />
		</Provider>,
	);
	// debug();

	expect(getByText(/All/i)).toBeInTheDocument();
	expect(getByText(/Week/i)).toBeInTheDocument();
	expect(getByText(/Day/i)).toBeInTheDocument();
});
