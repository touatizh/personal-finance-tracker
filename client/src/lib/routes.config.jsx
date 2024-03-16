import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Logout from "../components/containers/Logout";
import AccountsPage from "../pages/AccountsPage";
import AccountDetailsPage from "../pages/AccountDetailsPage";

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
	{
		path: "/register",
		element: <RegisterPage />,
		protected: false,
	},
	{
		path: "/logout",
		element: <Logout />,
		protected: true,
	},
	{
		path: "/accounts",
		element: <AccountsPage />,
		protected: true,
	},
	{
		path: "/accounts/:accountId",
		element: <AccountDetailsPage />,
		protected: true,
	},
];
