import { useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	Select,
	SelectItem,
	useDisclosure,
} from "@nextui-org/react";
import { SearchIcon } from "../ui/SearchIcon";
import AccountForm from "../forms/AccountForm";
import useAxios from "../../lib/useAxios";
import { useMutation, useQueryClient } from "react-query";

const AddFilterSort = ({ sortBy, filterBy, search, accounts }) => {
	const { isOpen, onOpenChange, onOpen } = useDisclosure();
	const [searchQuery, setSearchQuery] = useState("");
	const [sortValue, setSortValue] = useState("a-z");
	const [filterValue, setFilterValue] = useState("all");

	const queryClient = useQueryClient();
	const axios = useAxios();
	const { mutate: saveTransaction } = useMutation(
		(transactionData) =>
			axios.post(
				"http://localhost:8000/api/v1/transactions/",
				transactionData
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("transactions");
				onOpenChange();
			},
		}
	);

	return (
		<>
			<Card className="min-h-[600px] flex flex-col items-center">
				<CardHeader className="text-2xl justify-center font-bold my-8">
					Transactions
				</CardHeader>
				<CardBody className="flex flex-col gap-16 px-8 items-center max-w-xs">
					<Button
						className="w-full bg-default-100 hover:bg-default-200 font-bold text-sm text-text-darkest"
						onPress={onOpen}>
						Add a Transaction
					</Button>
					<Input
						size="lg"
						placeholder="Search..."
						startContent={<SearchIcon size={18} />}
						type="search"
						value={searchQuery}
						onValueChange={setSearchQuery}
						onChange={(e) => search(e.target.value)}
					/>
					<Select
						size="sm"
						label="Filter accounts"
						labelPlacement="outside"
						defaultSelectedKeys={["all"]}
						value={filterValue}
						onChange={(e) => filterBy(e.target.value)}
						onValueChange={(e) => {
							queryClient.invalidateQueries("transactions");
							setFilterValue(e.target.value);
						}}
						disallowEmptySelection>
						<SelectItem key={"all"} value={"all"} defaultValue>
							All
						</SelectItem>
						{accounts?.data?.map((account) => (
							<SelectItem key={account.id} value={account.id}>
								{account.name}
							</SelectItem>
						))}
					</Select>
					<Select
						size="sm"
						label="Sort by"
						labelPlacement="outside"
						defaultSelectedKeys={["date-newest"]}
						value={sortValue}
						onChange={(e) => sortBy(e.target.value)}
						onValueChange={setSortValue}
						disallowEmptySelection>
						<SelectItem key={"a-z"} value={"a-z"} defaultValue>
							Category - A-Z
						</SelectItem>
						<SelectItem key={"z-a"} value={"z-a"}>
							Category - Z-A
						</SelectItem>
						<SelectItem
							key={"amount-highest"}
							value={"amount-highest"}>
							Amount - Highest First
						</SelectItem>
						<SelectItem
							key={"amount-lowest"}
							value={"amount-lowest"}>
							Amount - Lowest First
						</SelectItem>
						<SelectItem key={"date-newest"} value={"date-newest"}>
							Date - Newest First
						</SelectItem>
						<SelectItem key={"date-oldest"} value={"date-oldest"}>
							Date - Oldest First
						</SelectItem>
					</Select>
				</CardBody>
			</Card>
		</>
	);
};

export default AddFilterSort;
