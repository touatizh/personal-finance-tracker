import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	Input,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import currencies from "../../lib/supportedCurrencies";

const AccountForm = ({
	isOpen,
	onOpenChange,
	onSubmit,
	accountData,
	modalHeader,
}) => {
	const owner = jwtDecode(localStorage.getItem("access_token")).user_id;
	const schema = z.object({
		name: z
			.string()
			.min(3, { message: "Name must be at least 3 characters" }),
		color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
			message: "Please select a valid hex color code",
		}),
		owner: z.number().gt(0, { message: "Please provide account owner" }),
		type: z.string().min(2, { message: "Please select an account type" }),
		balance: z.coerce
			.number()
			.min(0, { message: "Please provide a valid balance" }),
		currency: z
			.string()
			.min(3, { message: "Please select account currency" }),
	});
	const { control, register, handleSubmit } = useForm({
		defaultValues: accountData
			? accountData
			: {
					name: "",
					color: "#ffffff",
					owner,
					balance: 0,
					currency: "TND",
			  },
		resolver: zodResolver(schema),
	});
	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				className="min-h-[55vh]">
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">
						<p className="pb-2 border-b">
							{modalHeader || "Add a new account"}
						</p>
					</ModalHeader>
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid grid-flow-col gap-4 mb-8">
								<div className="col-span-6">
									<Controller
										name="name"
										control={control}
										render={({ field, fieldState }) => (
											<Input
												{...field}
												{...register("name")}
												isRequired
												isInvalid={fieldState.invalid}
												color={
													fieldState.invalid
														? "error"
														: ""
												}
												errorMessage={
													fieldState.error?.message
												}
												autoFocus
												label="Account name"
												variant="bordered"
											/>
										)}
									/>
								</div>
								<div>
									<Controller
										name="color"
										control={control}
										render={({ field, fieldState }) => (
											<Input
												{...field}
												{...register("color")}
												isRequired
												isInvalid={fieldState.invalid}
												color={
													fieldState.invalid
														? "error"
														: ""
												}
												errorMessage={
													fieldState.error?.message
												}
												label="Color"
												variant="bordered"
												type="color"
												className="max-w-16"
											/>
										)}
									/>
								</div>
							</div>
							<Controller
								name="type"
								control={control}
								render={({ field, fieldState }) => (
									<Select
										className="mb-8"
										{...field}
										{...register("type")}
										isRequired
										isInvalid={fieldState.invalid}
										color={
											fieldState.invalid ? "error" : ""
										}
										errorMessage={fieldState.error?.message}
										label="Account type"
										disallowEmptySelection
										defaultSelectedKeys={[
											accountData?.type || "GEN",
										]}>
										<SelectItem key={"GEN"} value={"GEN"}>
											General
										</SelectItem>
										<SelectItem key={"CASH"} value={"CASH"}>
											Cash
										</SelectItem>
										<SelectItem key={"CA"} value={"CA"}>
											Current Account
										</SelectItem>
										<SelectItem key={"SA"} value={"SA"}>
											Saving Account
										</SelectItem>
										<SelectItem key={"INV"} value={"INV"}>
											Investment Account
										</SelectItem>
									</Select>
								)}
							/>
							<div className="grid grid-flow-col gap-4 mb-8">
								<div className="col-span-2">
									<Controller
										name="balance"
										control={control}
										render={({ field, fieldState }) => (
											<Input
												{...field}
												{...register("balance")}
												isRequired
												isInvalid={fieldState.invalid}
												color={
													fieldState.invalid
														? "error"
														: ""
												}
												errorMessage={
													fieldState.error?.message
												}
												label="Initial balance"
												variant="bordered"
												type="number"
											/>
										)}
									/>
								</div>
								<div className="col-span-10">
									<Controller
										name="currency"
										control={control}
										render={({ field, fieldState }) => (
											<Select
												{...field}
												{...register("currency")}
												isRequired
												isInvalid={fieldState.invalid}
												color={
													fieldState.invalid
														? "error"
														: ""
												}
												errorMessage={
													fieldState.error?.message
												}
												items={Object.keys(currencies)}
												label="Account currency"
												selectionMode="single"
												defaultSelectedKeys={[
													accountData?.currency,
												]}>
												{Object.entries(currencies).map(
													(kvp) => (
														<SelectItem
															key={kvp[0]}
															value={kvp[1]}>
															{kvp[1]}
														</SelectItem>
													)
												)}
											</Select>
										)}
									/>
								</div>
							</div>

							<Controller
								name="owner"
								control={control}
								render={({ field, fieldState }) => (
									<input
										{...field}
										{...register("owner")}
										value={owner}
										type="hidden"
									/>
								)}
							/>
							<div className="flex justify-end gap-5">
								<Button
									color="danger"
									variant="flat"
									onPress={onOpenChange}>
									Cancel
								</Button>
								<Button color="primary" type="submit">
									Save
								</Button>
							</div>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AccountForm;
