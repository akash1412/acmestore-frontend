import { useState, useEffect } from "react";

import axios from "./../API/API";

const useFetch = (url: string, options: any): [any[], boolean] => {
	const [data, setData] = useState<[]>([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		function FETCH() {
			axios({
				url,
				...options,
			}).then(res => {
				setData(res.data.data.items);

				setIsLoading(false);
			});
		}

		FETCH();
	}, []);

	return [data, isLoading];
};

export default useFetch;
