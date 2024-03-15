import { useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { SearchIcon } from "../ui/SearchIcon";

const AddAndSort = ({ sortBy, search }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortValue, setSortValue] = useState("a-z");

	return (
		<Card className="min-h-[600px] flex flex-col items-center">
			<CardHeader className="text-2xl justify-center font-bold my-8">
				Accounts
			</CardHeader>
			<CardBody className="flex flex-col gap-16 px-8 items-center max-w-xs">
				<Button className="w-full bg-default-100 hover:bg-default-200 font-bold text-sm text-text-darkest">
					Add an Account
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
					size="lg"
					label="Sort by"
					labelPlacement="outside"
					defaultSelectedKeys={["a-z"]}
					value={sortValue}
					onChange={(e) => sortBy(e.target.value)}
					onValueChange={setSortValue}
					disallowEmptySelection>
					<SelectItem key={"a-z"} value={"a-z"} defaultValue>
						A-Z
					</SelectItem>
					<SelectItem key={"z-a"} value={"z-a"}>
						Z-A
					</SelectItem>
					<SelectItem
						key={"balance-highest"}
						value={"balance-highest"}>
						Balance - Highest First
					</SelectItem>
					<SelectItem key={"balance-lowest"} value={"balance-lowest"}>
						Balance - Lowest First
					</SelectItem>
				</Select>
			</CardBody>
		</Card>
	);
};

export default AddAndSort;
