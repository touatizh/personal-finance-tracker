import React from "react";
import LoginContainer from "../components/containers/LoginContainer";

const LoginPage = () => {
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-36 w-auto"
					src="./src/assets/img/logo.png"
				/>
				<h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-text">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<LoginContainer />
				<p className="mt-10 text-center text-sm text-text">
					{"Don't have an account? "}
					<a
						href="#"
						className="font-semibold leading-6 text-secondary-700 hover:text-secondary">
						Sign Up.
					</a>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
