import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const useAxios = () => {
	const BaseURL = "http://localhost:8000/";
	let access_token = localStorage.getItem("access_token");
	let refresh_token = localStorage.getItem("refresh_token");
	const axiosInstance = axios.create({
		baseURL: BaseURL,
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	axiosInstance.interceptors.request.use(async (req) => {
		const { exp } = jwtDecode(access_token);
		const isExpired = dayjs.unix(exp).diff(dayjs()) < 1;
		if (!isExpired) return req;
		const { data } = await axios.post(`${BaseURL}auth/token/refresh/`, {
			refresh: refresh_token,
		});
		localStorage.setItem("access_token", data.access);
		localStorage.setItem("refresh_token", data.refresh);
		req.headers.Authorization = `Bearer ${data.access}`;
		return req;
	});

	return axiosInstance;
};

export default useAxios;
