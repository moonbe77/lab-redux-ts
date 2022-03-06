import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchTrendingAction } from "./moviesSlice";
import styles from "./styles.module.css";

interface Props {
	values: any;
}

export interface FilterType {
	value: string;
	name: string | unknown;
}

function Filter({ values }: Props) {
	const [filters, setFilters] = React.useState<FilterType[]>([]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		let newFilters: FilterType[] = [];
		for (const [value, name] of Object.entries(values)) {
			newFilters.push({ value, name });
		}
		setFilters(newFilters);
	}, [values]);

	const handleFilter = (value: FilterType) => {
		dispatch(fetchTrendingAction(value.name));
	};

	return (
		<div className={styles.filterWrapper}>
			{filters.map((value: any) => (
				<div onClick={() => handleFilter(value)} key={value.name}>
					{value.name}
				</div>
			))}
		</div>
	);
}

export default Filter;
