import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import config from '../pages/ManagermentSite/config/config';
import useHttpRequest from './useHttpRequest';
import withAuth from './withAuth';

export const GET_USER = 'GET_USER';

const initialState = {
	userInfo: {},

	isLoggedIn: false,
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case GET_USER:
			state = { ...state, isLoggedIn: true, userInfo: payload };
			break;
	}

	return state;
};

export const AuthContext = React.createContext(initialState);

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { get } = useHttpRequest();

	const { isLoggedIn, userInfo } = state;

	const getUser = (_config = { ...config }) => {
		get('/logined', { ..._config }).then((response) => {
			const { data } = response;
			const { code, info } = data;

			// If the user was logged in page, to redirect home
			if (code === 200) {
				get(`/users/${info._id}`).then((res) => {
					const { user, code } = res.data;

					if (code === 200) {
						dispatch({ type: GET_USER, payload: user });
					}
				});
			}
		});
	};

	const logout = () => {
		window.localStorage.removeItem('access_token');
	};

	useEffect(() => {
		getUser();
	}, []);

	return <AuthContext.Provider value={{ userInfo, isLoggedIn, getUser, logout }}>{children}</AuthContext.Provider>;
};

function useAuth() {
	const { userInfo, isLoggedIn, getUser, logout } = useContext(AuthContext);

	return {
		auth: userInfo,
		isLoggedIn,
		logout,
		fetch: getUser,
	};
}

export { withAuth };

export default useAuth;
