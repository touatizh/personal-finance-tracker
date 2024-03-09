import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";

export const routes = [
	{
		path: "/dashboard",
		element: <DashboardPage />,
		protected: true,
	},
	{
		path: "/login",
		element: <LoginPage />,
		protected: false,
	},
];
