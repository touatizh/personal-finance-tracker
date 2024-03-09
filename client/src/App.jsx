import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./lib/hoc/Protected";
import WithProviders from "./lib/hoc/WithProviders";
import { routes } from "./lib/routes.config";

function App() {
	return (
		<Router>
			<WithProviders>
				<Routes>
					{routes.map((route) => {
						const e = route.protected ? (
							<Protected>{route.element}</Protected>
						) : (
							route.element
						);
						return (
							<Route
								key={route.path}
								path={route.path}
								element={e}
							/>
						);
					})}
				</Routes>
			</WithProviders>
		</Router>
	);
}

export default App;
