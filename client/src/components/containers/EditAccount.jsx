import useAxios from "../../lib/useAxios";
import { useMutation, useQueryClient } from "react-query";
import AccountForm from "../forms/AccountForm";

const EditAccount = ({ account, isOpen, onOpenChange }) => {
	const axios = useAxios();
	const queryClient = useQueryClient();

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
		<AccountForm
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			onSubmit={updateAccount}
			accountData={account}
			modalHeader="Edit Account"
		/>
	);
};

export default EditAccount;
