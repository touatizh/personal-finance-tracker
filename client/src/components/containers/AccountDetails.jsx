import useAxios from "../../lib/useAxios";
import { useQuery, useMutation, QueryClient } from "react-query";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
} from "@nextui-org/react";
import AccountIcon from "../ui/AccountIcon";
import { useParams } from "react-router-dom";
import { useState } from "react";
import AccountTransactions from "./AccountTransactions";
import AccountBalanceChart from "../charts/AccountBalanceChart";
import EditAccount from "./EditAccount";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";

const AccountDetails = () => {
	const { accountId } = useParams();
	const [activeTab, setActiveTab] = useState("balance");

	const axios = useAxios();
	const { data: details, isLoading } = useQuery(["accounts", accountId], () =>
		axios.get(`http://localhost:8000/api/v1/accounts/${accountId}`)
	);

	return (
		details && (
			<>
				<Card>
					<CardHeader className="flex justify-between px-10 py-4 bg-background-lightest border-b">
						<div className="text-lg font-bold">Account Detail</div>
						<div className="flex gap-8">
							<EditAccount account={details.data} />
							<DeleteAccount accountId={accountId} />
						</div>
					</CardHeader>
					<CardBody className="flex flex-row gap-12 px-10 py-8 border-b">
						<div className="max-w-fit">
							<AccountIcon
								accountType={details?.data?.type}
								width="75"
								height="75"
								fill="red-500"
								stroke="red-500"
							/>
						</div>
						<div className="flex flex-col gap-4">
							<div>
								<p className="text-gray-500 text-xs">Name</p>
								<p className="font-bold text-xs">
									{details?.data?.name}
								</p>
							</div>
							<div>
								<p className="text-gray-500 text-xs">Type</p>
								<p className="font-bold text-xs">
									{details?.data?.type}
								</p>
							</div>
						</div>
					</CardBody>
					<CardFooter className="py-0 px-8 min-h-16">
						<Button
							disableRipple
							disableAnimation
							radius="none"
							size="lg"
							className={
								activeTab === "balance"
									? "border-b border-b-2 border-blue-500 bg-transparent h-16"
									: "border-none bg-transparent h-16"
							}
							onClick={() => setActiveTab("balance")}>
							<p
								className={
									activeTab === "balance"
										? "text-md font-bold"
										: "text-md text-gray-500"
								}>
								Balance
							</p>
						</Button>
						<Button
							disableRipple
							disableAnimation
							radius="none"
							size="lg"
							className={
								activeTab === "transactions"
									? "border-b border-b-2 border-blue-500 bg-transparent h-16"
									: "border-none bg-transparent h-16"
							}
							onClick={() => setActiveTab("transactions")}>
							<p
								className={
									activeTab === "transactions"
										? "text-md font-bold"
										: "text-md text-gray-500"
								}>
								Transactions
							</p>
						</Button>
					</CardFooter>
				</Card>
				{activeTab === "balance" && (
					<AccountBalanceChart
						account={details.data}
						periodInDays={30}
					/>
				)}
				{activeTab === "transactions" && (
					<AccountTransactions account={accountId} />
				)}
			</>
		)
	);
};

export default AccountDetails;
