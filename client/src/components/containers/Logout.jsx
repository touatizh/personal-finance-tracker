import { useAuth } from "../../context/AuthContext";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const accessToken = localStorage.getItem("access_token");
	const refreshToken = localStorage.getItem("refresh_token");

	const { mutate: invalidateTokens } = useMutation(
		(access, refresh) =>
			axios.post(
				"http://localhost:8000/auth/logout/",
				{ refresh },
				{
					headers: {
						Authorization: `Bearer ${access}`,
					},
				}
			),
		{
			onSuccess: (res) => {
				if (res.status === 204) {
					logout();
				}
			},
			onError: (err) => {
				console.log(err);
				navigate("/login");
			},
		}
	);

	useEffect(() => {
		invalidateTokens(accessToken, refreshToken);
	}, []);
};

export default Logout;
