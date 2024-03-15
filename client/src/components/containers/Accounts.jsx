import { useQuery } from "react-query";
import useAxios from "../../lib/useAxios";
import { Card, CardBody } from "@nextui-org/react";
import AccountIcon from "../ui/AccountIcon";

const Accounts = ({ sortedBy, searched }) => {
	const axios = useAxios();
	const { data: accounts, isLoading } = useQuery("accounts", () =>
		axios.get("http://localhost:8000/api/v1/accounts/")
	);

	let sortedAccounts = accounts?.data?.sort((prev, next) => {
		switch (sortedBy) {
			case "a-z":
				return prev.name.localeCompare(next.name);
			case "z-a":
				return next.name.localeCompare(prev.name);
			case "balance-highest":
				return next.balance - prev.balance;
			case "balance-lowest":
				return prev.balance - next.balance;
			default:
				return prev.name.localeCompare(next.name);
		}
	});

	if (searched != "") {
		sortedAccounts = sortedAccounts?.filter((account) =>
			account.name.toLowerCase().includes(searched.toLowerCase())
		);
	}

	return (
		<div className="flex flex-col flex-wrap gap-8">
			{sortedAccounts?.map((account) => (
				<Card key={account.id} className="h-16 p-3">
					<CardBody className="flex flex-row items-center gap-2 px-2 py-0 overflow-visible">
						<AccountIcon
							accountType={account.type}
							fill="black"
							stroke="black"
						/>
						<div className="grid grid-cols-3 w-full">
							<p className="font-bold text-lg">{account.name}</p>
							<p className="text-gray-500">{account.type}</p>
							<p
								className={
									(account.balance < 0
										? "text-error"
										: "text-success-900") +
									" flex justify-end"
								}>
								<span className="font-bold ">
									{account.currency}
								</span>
								<span>{account.balance}</span>
							</p>
						</div>
					</CardBody>
				</Card>
			))}
		</div>
	);
};

export default Accounts;
