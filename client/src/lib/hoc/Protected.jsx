import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Protected = ({ children }) => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	});

	return <>{isAuthenticated && children}</>;
};

export default Protected;
