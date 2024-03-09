import RegisterContainer from "../components/containers/RegisterContainer";
import {
	Link,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from "@nextui-org/react";

const RegisterPage = () => {
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
						Join to Unveil
					</h2>
					<p className="text-sm text-text-light">
						Where your savings master the art of invisibility
					</p>
				</CardHeader>

				<CardBody className="">
					<RegisterContainer />
				</CardBody>

				<CardFooter className="mt-5 flex justify-center">
					<p className="text-sm">
						Already have an account?{" "}
						<Link
							href="/login"
							className="font-semibold text-sm text-secondary-700 hover:text-secondary">
							Sign In.
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default RegisterPage;
