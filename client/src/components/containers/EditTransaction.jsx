import useAxios from "../../lib/useAxios";
import { useMutation, useQueryClient } from "react-query";
import { useDisclosure } from "@nextui-org/react";
import TransactionForm from "../forms/TransactionForm";
import { useEffect, useState } from "react";

const EditTransaction = ({
	transaction,
	isOpen,
	onOpenChange,
	onClose,
	accounts,
}) => {
	const axios = useAxios();
	const queryClient = useQueryClient();

	const { mutate: updateTransaction } = useMutation(
		(updatedData) =>
			axios.put(
				`http://localhost:8000/api/v1/transactions/${transaction.id}/`,
				updatedData
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("transactions");
				onOpenChange();
			},
		}
	);

	return (
		<TransactionForm
			accounts={accounts}
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			onClose={onClose}
			onSubmit={updateTransaction}
			transactionData={transaction}
			modalHeader="Edit Transaction"
		/>
	);
};

export default EditTransaction;
