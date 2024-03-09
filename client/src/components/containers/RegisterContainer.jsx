import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import RegisterForm from "../forms/RegisterForm";

const RegisterContainer = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [errors, setErrors] = useState("");

	const { mutate: register } = useMutation(
		(userInfo) =>
			axios.post("http://localhost:8000/api/v1/users/", userInfo),
		{
			onSuccess: (res) => {
				login(res.data.tokens);
				navigate("/dashboard");
			},
			onError: (err) => {
				setErrors(err.response.data);
			},
		}
	);

	return <RegisterForm onSubmit={register} errors={errors} />;
};

export default RegisterContainer;
