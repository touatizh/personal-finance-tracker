import useAxios from "../../lib/useAxios";
import { useQuery } from "react-query";
import { timeAgo } from "../../lib/calculateTimeAgo";
import { Card, CardBody } from "@nextui-org/react";
import { groupSort } from "../../lib/transactionsGroupsSort";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const ListTransactions = ({ filterBy, sortBy, search }) => {
	const [grouped, setGrouped] = useState([]);

	const axios = useAxios();
	const { data: transactions, isLoading } = useQuery(
		["transactions"],
		() => axios.get("http://localhost:8000/api/v1/transactions"),
		{
			onSuccess: (res) => {
				timeAgo(res);
				return res;
			},
		}
	);

	useEffect(() => {
		if (!transactions) return;

		let filteredData = transactions?.data;

		if (filterBy !== "all" && !isNaN(parseInt(filterBy))) {
			filteredData = filteredData.filter(
				(t) => t.account === parseInt(filterBy)
			);
		}
		if (search != "") {
			filteredData = filteredData.filter((t) =>
				t.category.toLowerCase().includes(search.toLowerCase())
			);
		}
		const filteredSortedData = filteredData.sort((prev, next) => {
			switch (sortBy) {
				case "a-z":
					return prev.category.localeCompare(next.category);
				case "z-a":
					return next.category.localeCompare(prev.category);
				case "amount-highest":
					return next.amount - prev.amount;
				case "amount-lowest":
					return prev.amount - next.amount;
				case "date-oldest":
					return dayjs(prev.date_time) - dayjs(next.date_time);
				default:
					return dayjs(next.date_time) - dayjs(prev.date_time);
			}
		});

		let grouped = Object.groupBy(filteredSortedData, (t) => t.ago);
		grouped = Object.fromEntries(Object.entries(grouped));
		const groupedKeys = Object.keys(grouped).sort(groupSort);
		const groupedSorted = groupedKeys.map((key) => ({
			group: key,
			transactions: grouped[key],
		}));

		setGrouped(groupedSorted);
	}, [transactions, filterBy, sortBy, search]);

	return (
		transactions && (
			<div className="flex flex-col flex-wrap gap-4">
				{grouped?.length === 0 ? (
					<p className="text-md font-bold mb-3">
						No transactions recorded yet
					</p>
				) : (
					grouped?.map((group, _) => (
						<div key={_}>
							<p className="text-md font-bold mb-3">
								{group.group}
							</p>
							{group?.transactions?.map((t) => (
								<Card key={t.id} className="h-12 p-3 mb-3">
									<CardBody className="flex flex-row items-center gap-2 px-2 py-0 overflow-visible">
										<div className="grid grid-cols-3 w-full items-center text-sm">
											<p className="font-bold">
												{t.category}
											</p>
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
													{(t.type == "EXP"
														? "-"
														: "+") + t.currency}
												</span>
												<span> {t.amount}</span>
											</p>
										</div>
									</CardBody>
								</Card>
							))}
						</div>
					))
				)}
			</div>
		)
	);
};

export default ListTransactions;
