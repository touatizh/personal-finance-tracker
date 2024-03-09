import { AuthProvider } from "../../context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

const WithProviders = ({ children }) => {
	const navigate = useNavigate();
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<NextUIProvider navigate={navigate}>{children}</NextUIProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default WithProviders;
