import NavBar from "../components/containers/NavBar";
import ListAccounts from "../components/containers/ListAccounts";
import RecentTransactions from "../components/containers/RecentTransactions";

const DashboardPage = () => {
	return (
		<>
			<NavBar />
			<ListAccounts />
			<div className="mt-10 grid grid-cols-3 gap-4 mx-5">
				<div>
					<RecentTransactions />
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
