import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const authState = localStorage.getItem("isAuthenticated") === "true";
	const [isAuthenticated, setAuthenticated] = useState(authState);

	const login = (tokens) => {
		localStorage.setItem("access_token", tokens.access);
		localStorage.setItem("refresh_token", tokens.refresh);
		localStorage.setItem("isAuthenticated", "true");
		setAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("isAuthenticated");
		setAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	return useContext(AuthContext);
};

export { AuthProvider, useAuth };
