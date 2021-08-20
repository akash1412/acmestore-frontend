import { useState, useEffect } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

interface State<D> {
	isLoading: boolean;
	data?: D;
	error?: string;
}

export default function useFetch<D = unknown>({
	url,
	options,
	dep,
}: {
	url: string;
	dep?: any;
	options?: AxiosRequestConfig;
}) {
	//@ts-ignore
	const [state, setState] = useState<State<D>>({
		isLoading: false,
		data: undefined,
		error: undefined,
	});

	useEffect(() => {
		function FETCH() {
			setState({
				...state,
				isLoading: true,
			});
			try {
				axios(url, options).then(res => {
					setState({ ...state, data: res.data.data });
				});
			} catch (error: any) {
				setState({ ...state, error: error.response.message });
			} finally {
				setState({
					...state,
					isLoading: true,
				});
			}
		}

		FETCH();
	}, [url, dep]);

	return state;
}
