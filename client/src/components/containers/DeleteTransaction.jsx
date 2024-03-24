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

const DeleteTransaction = ({ transactionId }) => {
	const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
	const axios = useAxios();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: deleteTransaction } = useMutation(
		() =>
			axios.delete(
				`http://localhost:8000/api/v1/transactions/${transactionId}`
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("transactions");
				navigate("/transactions");
			},
		}
	);

	return (
		<>
			<Button variant="ghost" color="danger" onPress={onOpen} size="sm">
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
						delete this transaction&apos;s data from the server.
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
							onPress={deleteTransaction}
							className="text-white max-h-9">
							Continue
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteTransaction;
