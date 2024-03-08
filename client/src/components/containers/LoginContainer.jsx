import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LoginForm from "../forms/LoginForm";

const LoginContainer = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState("");

	const { mutate: getTokens } = useMutation(
		(credentials) =>
			axios.post("http://localhost:8000/auth/token/", credentials),
		{
			onSuccess: (res) => {
				localStorage.setItem("access_token", res.data.access);
				localStorage.setItem("refresh_token", res.data.refresh);
				navigate("/dashboard");
			},
			onError: (err) => {
				if (err.response.status == 401) {
					setErrors("Invalid email or password");
				} else {
					setErrors("An error occurred. Please try again later.");
				}
			},
		}
	);

	const authenticate = async (credentials) => {
		await getTokens(credentials);
	};

	return <LoginForm onSubmit={authenticate} errors={errors} />;
};

export default LoginContainer;
