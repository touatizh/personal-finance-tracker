import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";

const LoginForm = ({ onSubmit, errors }) => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<Input
					{...register("email")}
					isRequired
					name="email"
					type="email"
					label="Email"
				/>
			</div>

			<div>
				<Input
					{...register("password")}
					isRequired
					name="password"
					type="password"
					label="Password"
				/>
				{errors && (
					<div className="mt-2 ps-3 text-sm text-error">{errors}</div>
				)}
			</div>

			<div className="flex items-center justify-center">
				<Button
					disabled={isSubmitting}
					shadow
					radius="md"
					type="submit"
					color="primary">
					{isSubmitting ? "Loading..." : "Sign In"}
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
