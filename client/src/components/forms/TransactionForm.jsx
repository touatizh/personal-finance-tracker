import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	Input,
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import currencies from "../../lib/supportedCurrencies";
import categories from "../../lib/transactionCategories";
import dayjs from "dayjs";
import { useEffect } from "react";

const TransactionForm = ({
	accounts,
	isOpen,
	onOpenChange,
	onClose,
	onSubmit,
	transactionData,
	modalHeader,
}) => {
	const schema = z.object({
		account: z.coerce.number(),
		type: z.string().min(3, { message: "Please select transaction type" }),
		category: z
			.string()
			.min(3, { message: "Please select transaction category" }),
		amount: z.coerce
			.number()
			.gt(0, { message: "Please provide a valid amount" }),
		currency: z
			.string()
			.min(3, { message: "Please select transaction currency" }),
		date_time: z.coerce
			.date({
				message: "Please provide transaction date and time",
				offset: true,
			})
			.max(new Date(), {
				message: "Transaction date and time cannot be in the future",
			}),
		description: z.string().optional(),
	});
	const { control, register, handleSubmit, reset } = useForm({
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		reset({
			amount: transactionData?.amount || 0,
			date_time:
				dayjs(transactionData?.date_time).format("YYYY-MM-DDTHH:mm") ||
				dayjs().format("YYYY-MM-DDTHH:mm"),
			description: transactionData?.description || "",
		});
	}, [transactionData]);

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
							{modalHeader || "Add a new transaction"}
						</p>
					</ModalHeader>
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid grid-flow-col gap-4 mb-8">
								<div className="col-span-6">
									<Controller
										name="type"
										control={control}
										render={({ field, fieldState }) => (
											<Select
												{...field}
												{...register("type")}
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
												label="Type"
												disallowEmptySelection
												defaultSelectedKeys={[
													transactionData?.type || "",
												]}>
												<SelectItem
													key={"EXP"}
													value={"EXP"}>
													Expense
												</SelectItem>
												<SelectItem
													key={"INC"}
													value={"INC"}>
													Income
												</SelectItem>
											</Select>
										)}
									/>
								</div>
								<div className="col-span-6">
									<Controller
										name="account"
										control={control}
										render={({ field, fieldState }) => (
											<Select
												{...field}
												{...register("account")}
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
												label="Account"
												disallowEmptySelection
												defaultSelectedKeys={[
													transactionData?.account.toString() ||
														"",
												]}>
												{accounts?.data?.map(
													(account) => (
														<SelectItem
															key={account.id}
															value={account.id}>
															{account.name}
														</SelectItem>
													)
												)}
											</Select>
										)}
									/>
								</div>
							</div>
							<Controller
								name="category"
								control={control}
								render={({ field, fieldState }) => (
									<Select
										className="mb-8"
										{...field}
										{...register("category")}
										isRequired
										isInvalid={fieldState.invalid}
										color={
											fieldState.invalid ? "error" : ""
										}
										errorMessage={fieldState.error?.message}
										label="Category"
										disallowEmptySelection
										defaultSelectedKeys={[
											transactionData?.category || "",
										]}>
										{Object.entries(categories).map(
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

							<div className="grid grid-flow-col gap-4 mb-8">
								<div className="col-span-4">
									<Controller
										name="amount"
										control={control}
										render={({ field, fieldState }) => (
											<Input
												{...field}
												{...register("amount")}
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
												label="Amount"
												variant="bordered"
												type="number"
												step="0.01"
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
												label="Currency"
												defaultSelectedKeys={[
													transactionData?.currency ||
														"",
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
								name="date_time"
								control={control}
								render={({ field, fieldState }) => (
									<Input
										type="datetime-local"
										className="mb-8"
										{...field}
										{...register("date_time")}
										isRequired
										isInvalid={fieldState.invalid}
										color={
											fieldState.invalid ? "error" : ""
										}
										errorMessage={fieldState.error?.message}
										label="Date and Time"
										onChange={(e) => {
											const value = dayjs(
												e.target.value
											).format("YYYY-MM-DDTHH:mm");
											field.onChange(value);
										}}
									/>
								)}
							/>
							<div className="mb-8">
								<Controller
									name="description"
									control={control}
									render={({ field }) => (
										<Textarea
											{...field}
											{...register("description")}
											label="Description"
										/>
									)}
								/>
							</div>
							<div className="flex justify-end gap-5">
								<Button
									color="danger"
									variant="flat"
									onPress={onClose}>
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

export default TransactionForm;
