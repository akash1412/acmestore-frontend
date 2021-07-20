import { useState, useEffect } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

export default function useFetch<D>(props: {
	url: string;
	slug?: string;
	options?: AxiosRequestConfig;
}): [D, boolean] {
	const [data, setData] = useState(null as unknown as D);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		function FETCH() {
			axios({
				url: `https://ecom-api-v1.herokuapp.com/api/v1${props.url}`,
				method: 'GET',
			}).then(res => {
				setData(res.data.data);

				setIsLoading(false);
			});
		}

		FETCH();
	}, [props.url, props.slug]);

	return [data, isLoading];
}

// export default useFetch;
