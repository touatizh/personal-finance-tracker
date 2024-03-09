import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = ({ onSubmit, errors }) => {
	const schema = z.object({
		first_name: z
			.string()
			.min(3, { message: "First name must be at least 3 characters" }),
		last_name: z
			.string()
			.min(3, { message: "Last name must be at least 3 characters" }),
		email: z
			.string()
			.email({ message: "Please enter a valid email address" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
		confirm_password: z.string().refine((value) => value === password, {
			message: "Passwords do not match",
		}),
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
		watch,
	} = useForm({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			confirm_password: "",
		},
		resolver: zodResolver(schema),
	});

	const password = watch("password");

	return (
		<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-2 gap-4">
				<Controller
					name="first_name"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							{...register("first_name")}
							isRequired
							variant="bordered"
							isInvalid={fieldState.invalid}
							color={fieldState.invalid ? "error" : ""}
							name="first_name"
							label="First name"
							errorMessage={fieldState.error?.message}
						/>
					)}
				/>
				<Controller
					name="last_name"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							{...register("last_name")}
							isRequired
							variant="bordered"
							isInvalid={fieldState.invalid}
							color={fieldState.invalid ? "error" : ""}
							name="last_name"
							label="Last name"
							errorMessage={fieldState.error?.message}
						/>
					)}
				/>
			</div>

			<div>
				<Controller
					name="email"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							{...register("email")}
							autoComplete="off"
							isRequired
							variant="bordered"
							isInvalid={fieldState.invalid}
							color={fieldState.invalid ? "error" : ""}
							name="email"
							label="Email"
							description="We'll never share your email with anyone else."
							errorMessage={fieldState.error?.message}
						/>
					)}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Controller
					name="password"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							{...register("password")}
							isRequired
							variant="bordered"
							type="password"
							isInvalid={fieldState.invalid}
							color={fieldState.invalid ? "error" : ""}
							name="password"
							label="Password"
							errorMessage={fieldState.error?.message}
						/>
					)}
				/>
				<Controller
					name="confirm_password"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							{...register("confirm_password")}
							isRequired
							type="password"
							variant="bordered"
							isInvalid={fieldState.invalid}
							color={fieldState.invalid ? "error" : ""}
							name="confirm_password"
							label="Confirm Password"
							errorMessage={fieldState.error?.message}
						/>
					)}
				/>
			</div>

			<div className="flex items-center justify-center">
				<Button
					className="w-1/3"
					disabled={isSubmitting}
					shadow
					radius="md"
					type="submit"
					color="primary">
					{isSubmitting ? "Loading..." : "Sign Up"}
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
