import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import LoginForm from "../forms/LoginForm";

const LoginContainer = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [errors, setErrors] = useState("");

	const { mutate: getTokens } = useMutation(
		(credentials) =>
			axios.post("http://localhost:8000/auth/token/", credentials),
		{
			onSuccess: (res) => {
				login(res.data);
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

	return <LoginForm onSubmit={getTokens} errors={errors} />;
};

export default LoginContainer;
