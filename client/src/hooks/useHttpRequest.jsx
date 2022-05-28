import React from 'react';
import Axios from 'axios';

function useHttpRequest() {
	const axiosInstance = Axios.create({
		baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/`,
	});

	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('access_token')}`;

	axiosInstance.interceptors.request.use((configs) => {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('access_token')}`;

		return configs;
	});

	axiosInstance.interceptors.response.use((res) => {
		return res;
	});

	return {
		get: axiosInstance.get,
		post: axiosInstance.post,
		put: axiosInstance.put,
		patch: axiosInstance.patch,
		delete: axiosInstance.delete,

		__instance__: axiosInstance,
	};
}

export function withHttpRequest(WrapperComponent) {
	return ({ ...props }) => {
		const { get, post, put, patch, delete: httpDelete } = useHttpRequest();

		return <WrapperComponent http={{ get, post, put, patch, delete: httpDelete }} {...props} />;
	};
}

export default useHttpRequest;
