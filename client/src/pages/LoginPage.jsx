import LoginContainer from "../components/containers/LoginContainer";
import {
	Link,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from "@nextui-org/react";

const LoginPage = () => {
	return (
		<div className="flex justify-center items-center min-h-dvh">
			<Card
				className="flex flex-1 flex-col justify-center py-5 px-6 lg:px-9 max-w-xl"
				shadow="lg">
				<CardHeader className="flex-col items-start">
					<img
						className="mx-auto h-36"
						src="./src/assets/img/logo.png"
					/>
					<h2 className="mt-3 text-xl font-bold leading-9 tracking-tight">
						Sign In & Peek Behind the Curtain
					</h2>
					<p className="text-sm text-text-light">
						{
							"Witness the horror show of last night's spending spree"
						}
					</p>
				</CardHeader>

				<CardBody>
					<LoginContainer />
				</CardBody>

				<CardFooter className="mt-5 flex justify-center">
					<p className="text-sm">
						{"Don't have an account?"}{" "}
						<Link
							href="/register"
							className="font-semibold text-sm text-secondary-700 hover:text-secondary">
							Sign Up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default LoginPage;
