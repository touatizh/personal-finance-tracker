import useAxios from "../../lib/useAxios";
import { useMutation, useQueryClient } from "react-query";
import AccountForm from "../forms/AccountForm";
import { Button, useDisclosure } from "@nextui-org/react";

const EditAccount = ({ account }) => {
	const axios = useAxios();
	const queryClient = useQueryClient();
	const { isOpen, onOpenChange, onOpen } = useDisclosure();

	const { mutate: updateAccount } = useMutation(
		(updatedData) =>
			axios.put(
				`http://localhost:8000/api/v1/accounts/${account.id}/`,
				updatedData
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("accounts");
				onOpenChange();
			},
		}
	);

	return (
		<>
			<Button variant="ghost" color="primary" onPress={onOpen}>
				Edit
			</Button>
			<AccountForm
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onSubmit={updateAccount}
				accountData={account}
				modalHeader="Edit Account"
			/>
		</>
	);
};

export default EditAccount;
