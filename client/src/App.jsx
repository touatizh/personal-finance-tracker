import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route
						default
						path="/dashboard"
						element={<DashboardPage />}
					/>
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
