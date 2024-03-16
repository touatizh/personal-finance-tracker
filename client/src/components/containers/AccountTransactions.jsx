import useAxios from "../../lib/useAxios";
import { useQuery } from "react-query";
import { timeAgo } from "../../lib/calculateTimeAgo";
import { Card, CardBody } from "@nextui-org/react";

const groupSort = (prev, next) => {
	const regex = /\d+/;
	const prevNum = parseInt(prev.match(regex));
	const nextNum = parseInt(next.match(regex));
	switch (true) {
		case prev.includes("minute") && next.includes("hour"):
			return -1;
		case prev.includes("hour") && next.includes("minute"):
			return 1;
		case prev.includes("minute") && next.includes("minutes"):
		case prev.includes("hour") && next.includes("hours"):
		case prev.includes("yesterday") && next.includes("minutes"):
			return 1;
		case prev.includes("yesterday") && next.includes("hours"):
			return 1;
		case prev.includes("yesterday") && next.includes("yesterday"):
			return 0;
		case prev.includes("minute") && next.includes("yesterday"):
			return -1;
		case prev.includes("hour") && next.includes("yesterday"):
			return -1;
		default:
			return new Date(prev) - new Date(next);
	}
};
const AccountTransactions = ({ account }) => {
	const axios = useAxios();
	const { data: transactions, isLoading } = useQuery(
		["transactions", account],
		() => axios.get("http://localhost:8000/api/v1/transactions"),
		{
			onSuccess: (res) => {
				timeAgo(res);
				res.data = res.data
					.filter((t) => t.account.id == account)
					.sort(
						(prev, next) =>
							new Date(next.date_time) - new Date(prev.date_time)
					);
				let grouped = Object.groupBy(res.data, (t) => t.ago);
				grouped = Object.fromEntries(Object.entries(grouped));
				const groupedKeys = Object.keys(grouped).sort(groupSort);
				const groupedSorted = [];
				groupedKeys.forEach((key) => {
					groupedSorted.push({
						group: key,
						transactions: grouped[key],
					});
				});
				res.data = groupedSorted;
				return res;
			},
		}
	);
	return (
		<div className="mt-5 flex flex-col flex-wrap gap-4">
			{transactions?.data?.map((group, _) => (
				<div key={_}>
					<p className="text-md font-bold mb-3">{group.group}</p>
					{group?.transactions?.map((t) => (
						<Card key={t.id} className="h-12 p-3 mb-3">
							<CardBody className="flex flex-row items-center gap-2 px-2 py-0 overflow-visible">
								<div className="grid grid-cols-3 w-full items-center text-sm">
									<p className="font-bold">{t.category}</p>
									<p className="text-gray-500">
										<span
											className="h-[10px] w-[10px] rounded-full inline-block"
											style={{
												backgroundColor:
													t.account.color,
											}}></span>{" "}
										{t.account.name}
									</p>
									<p
										className={
											(t.type == "EXP"
												? "text-error"
												: "text-success-900") +
											" flex justify-end"
										}>
										<span className="font-bold ">
											{(t.type == "EXP" ? "-" : "+") +
												t.currency}
										</span>
										<span> {t.amount}</span>
									</p>
								</div>
							</CardBody>
						</Card>
					))}
				</div>
			))}
		</div>
	);
};

export default AccountTransactions;
