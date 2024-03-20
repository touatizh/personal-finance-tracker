import { useState, useEffect } from "react";
import useAxios from "../../lib/useAxios";
import { useQuery } from "react-query";
import { calculatePastBalance } from "../../lib/calculateBalance";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import dayjs from "dayjs";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const AccountBalanceChart = ({ account, periodInDays }) => {
	const [chartData, setChartData] = useState(false);
	const axios = useAxios();
	const { data: transactions, isLoading } = useQuery(
		["transactions"],
		() => axios.get("http://localhost:8000/api/v1/transactions"),
		{
			onSuccess: (res) => {
				res.data = res.data
					.filter((t) => t.account == account?.id)
					.sort(
						(prev, next) =>
							dayjs(next.date_time) - dayjs(prev.date_time)
					);
				return res;
			},
		}
	);

	useEffect(() => {
		if (!isLoading && transactions) {
			const dailyBalances = calculatePastBalance(
				transactions?.data,
				account?.balance,
				periodInDays
			);
			setChartData(dailyBalances);
		}
	}, [isLoading, transactions, account, periodInDays]);

	return (
		chartData && (
			<Card className="mt-5 h-96">
				<CardHeader className="grid grid-cols-12 mx-6 mt-6">
					<div className="flex flex-col gap-2 col-span-3">
						<div className="text-sm text-text-light">TODAY</div>
						<span className="text-lg font-bold">
							{account?.currency} {account?.balance}
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-sm text-text-light">VS PAST</div>

						{(() => {
							const fraction =
								chartData[0]?.balance /
								chartData[chartData.length - 1]?.balance;

							if (fraction >= 1) {
								return (
									<span className="text-success-900 text-lg font-bold">
										{parseInt((fraction - 1) * 100)}%
									</span>
								);
							} else {
								return (
									<span className="text-error text-lg font-bold">
										{parseInt((fraction - 1) * 100)}%
									</span>
								);
							}
						})()}
					</div>
				</CardHeader>
				<CardBody className="pb-6">
					<ResponsiveContainer>
						<LineChart
							data={chartData}
							margin={{ left: 20, right: 20 }}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="date"
								reversed
								interval="preserveStart"
								axisLine={false}
								tickLine={false}
								ticks={customDomain(chartData)}
								padding={{ top: 100, bottom: 10 }}
							/>
							<YAxis tickLine={false} />
							<Tooltip />
							<Legend
								align="left"
								iconType="circle"
								iconSize={10}
								margin={{ top: 10 }}
							/>
							<Line
								type="monotone"
								dataKey="balance"
								stroke="#7FBAFF"
								strokeWidth={3}
								dot={false}
								activeDot={{ r: 5 }}
								unit={account?.currency}
							/>
						</LineChart>
					</ResponsiveContainer>
				</CardBody>
			</Card>
		)
	);
};

export default AccountBalanceChart;

const customDomain = (data) => {
	const domaine = [];
	for (let i = 0; i <= data.length; i += 4) {
		domaine.push(data[i]?.date);
	}
	return domaine;
};
