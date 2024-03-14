import useAxios from "../../lib/useAxios";
import { useQuery } from "react-query";
import { Card, CardHeader, CardBody, Link, Skeleton } from "@nextui-org/react";
import { timeAgo } from "../../lib/calculateTimeAgo";

const RecentTransactions = () => {
	const axios = useAxios();
	const { data: transactions, isLoading } = useQuery(
		"transactions",
		() => axios.get("http://localhost:8000/api/v1/transactions/"),
		{
			onSuccess: (res) => {
				timeAgo(res);
				res.data = res.data
					.sort(
						(prev, next) =>
							new Date(next.date_time) - new Date(prev.date_time)
					)
					.slice(0, 5);
				return res;
			},
			onError: (err) => console.log(err),
		}
	);

	if (!transactions || isLoading)
		return (
			<Card className="flex flex-1 flex-col justify-center py-2 sm:px-3">
				<CardHeader className="font-bold border-b flex justify-between">
					<p>Recent Transactions</p>
					<Link href="#" className="text-sm text-secondary">
						Show all
					</Link>
				</CardHeader>
				<CardBody className="flex gap-5 px-0">
					{[...Array(5)].map((_, i) => (
						<Skeleton key={i} className="h-4 w-full rounded-full" />
					))}
				</CardBody>
			</Card>
		);

	return (
		<Card className="flex flex-1 flex-col justify-center py-2 sm:px-3">
			<CardHeader className="font-bold border-b flex justify-between">
				<p>Recent Transactions</p>
				<Link href="#" className="text-sm text-secondary">
					Show all
				</Link>
			</CardHeader>
			<CardBody className="flex gap-5 px-0">
				<ul>
					{transactions?.data.map((trans) => {
						return (
							<li
								key={trans.id}
								className="grid grid-cols-2 mb-2">
								<div className="flex flex-col">
									<div className="text-sm font-bold">
										{trans.category}
									</div>
									<div className="text-sm">
										<span
											className="h-3 w-3 rounded-full inline-block"
											style={{
												backgroundColor:
													trans.account.color,
											}}></span>
										<span className="ms-1">
											{trans.account.name}
										</span>
									</div>
								</div>

								<div className="flex flex-col">
									<div className="text-sm font-bold">
										{trans.type === "EXP" ? (
											<div className="text-error text-right">
												<span>{trans.currency}</span>
												<span>-{trans.amount}</span>
											</div>
										) : (
											<div className="text-success-900 text-right">
												<span>{trans.currency}</span>
												<span>+{trans.amount}</span>
											</div>
										)}
									</div>
									<div className="text-sm text-right">
										{trans.ago}
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</CardBody>
		</Card>
	);
};

export default RecentTransactions;
