import useAxios from "../../lib/useAxios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalContent,
	useDisclosure,
	ModalFooter,
} from "@nextui-org/react";

const DeleteAccount = ({ accountId }) => {
	const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
	const axios = useAxios();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: deleteAccount } = useMutation(
		() =>
			axios.delete(`http://localhost:8000/api/v1/accounts/${accountId}`),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("accounts");
				navigate("/accounts");
			},
		}
	);

	return (
		<>
			<Button variant="ghost" color="danger" onPress={onOpen}>
				Delete
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				className="w-2/3 p-6">
				<ModalContent>
					<ModalHeader className="p-0">
						Are you sure you sure?
					</ModalHeader>
					<ModalBody className="p-0 pt-2 text-sm text-gray-500">
						This action cannot be undone. This will permanently
						delete the account and all the associated transactions
						and remove data from the server.
					</ModalBody>
					<ModalFooter className="p-0 pt-4">
						<Button
							variant="bordered"
							radius="sm"
							onPress={onClose}
							className="border-1 border-gray-300 max-h-9">
							Cancel
						</Button>
						<Button
							color="danger"
							variant="solid"
							radius="sm"
							onPress={deleteAccount}
							className="text-white max-h-9">
							Continue
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteAccount;
