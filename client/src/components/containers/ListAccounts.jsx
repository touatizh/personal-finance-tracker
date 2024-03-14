import { useQuery } from "react-query";
import useAxios from "../../lib/useAxios";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import AccountIcon from "../ui/AccountIcon";

const ListAccounts = () => {
	const axios = useAxios();
	const { data: accounts, isLoading } = useQuery("accounts", () =>
		axios.get("http://localhost:8000/api/v1/accounts/")
	);

	if (!accounts || isLoading)
		return (
			<div className="flex flex-row flex-wrap gap-4 p-4 bg-white">
				<Card shadow="md" className="w-64 h-16 p-2 rounded-xl">
					<CardBody className="flex flex-row items-center gap-2 px-2 py-0 overflow-visible">
						<Skeleton className="flex rounded-full w-8 h-8" />
						<div className="flex flex-col gap-3 w-3/4">
							{[...Array(2)].map((_, i) => (
								<Skeleton
									key={i}
									className="h-4 w-full rounded-full"
								/>
							))}
						</div>
					</CardBody>
				</Card>
			</div>
		);

	return (
		<div className="flex flex-row flex-wrap gap-4 p-4 bg-white">
			{accounts?.data?.map((account, index) => (
				<Card
					shadow="md"
					className="w-64 h-16 p-2 rounded-xl"
					style={{ backgroundColor: account.color }}
					key={index}
					isPressable>
					<CardBody className="flex flex-row items-center gap-2 px-2 py-0 overflow-visible">
						<AccountIcon accountType={account.type} />
						<div>
							<p className="font-semibold text-md text-white text-opacity-50">
								{account.name}
							</p>
							<p className="text-lg text-white">
								<span className="font-medium">
									{account.currency}{" "}
								</span>
								{account.balance}
							</p>
						</div>
					</CardBody>
				</Card>
			))}
			<Card
				shadow="md"
				className="w-64 h-16 p-2 rounded-xl outline-none border-2 border-dashed border-slate-300 hover:border-primary-300"
				isPressable>
				<CardBody className="flex flex-row justify-center items-center p-0 overflow-visible">
					<svg
						width="26"
						height="26"
						className="fill-background-dark stroke-background-dark">
						<path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
					</svg>
					<p className="font-semibold text-background-dark">
						Add Account
					</p>
				</CardBody>
			</Card>
		</div>
	);
};

export default ListAccounts;
