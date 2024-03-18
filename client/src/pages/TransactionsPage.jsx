import { useState } from "react";
import AddFilterSort from "../components/containers/AddFilterSort";
import NavBar from "../components/containers/NavBar";
import ListTransactions from "../components/containers/ListTransactions";
import useAxios from "../lib/useAxios";
import { useQuery } from "react-query";

const TransactionsPage = () => {
	const [sortedBy, setSortedBy] = useState("a-z");
	const [accountFilter, setAccountFilter] = useState("all");
	const [search, setSearch] = useState("");

	const axios = useAxios();
	const { data: accounts, isLoading } = useQuery("accounts", () =>
		axios.get("http://localhost:8000/api/v1/accounts/")
	);

	return (
		<>
			<NavBar />
			<div className="grid grid-cols-12 gap-4 mt-10 mx-5">
				<div className="col-span-3 max-w-[280px]">
					<AddFilterSort
						sortBy={setSortedBy}
						filterBy={setAccountFilter}
						search={setSearch}
						accounts={accounts}
					/>
				</div>
				<div className="col-span-9">
					<ListTransactions
						sortBy={sortedBy}
						search={search}
						filterBy={accountFilter}
					/>
				</div>
			</div>
		</>
	);
};

export default TransactionsPage;
