import { useState, useEffect } from "react";

import axios from "./../API/API";
import { Item } from "../Interface/Interface";

const useFetch = (
	url: string,
	options: any,
	query?: string
): [{ total: number; items: Item[] } | null, boolean] => {
	const [data, setData] =
		useState<{ total: number; items: Item[] } | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		console.log(query);
		function FETCH() {
			axios({
				url: `${url}/${query}`,
				...options,
			}).then(res => {
				console.log(res);
				setData(res.data.data);

				setIsLoading(false);
			});
		}

		FETCH();
	}, []);

	return [data, isLoading];
};

export default useFetch;
