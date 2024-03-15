import { useState } from "react";
import Accounts from "../components/containers/Accounts";
import AddAndSort from "../components/containers/AddAndSort";
import NavBar from "../components/containers/NavBar";

const AccountsPage = () => {
	const [sortedBy, setSortedBy] = useState("a-z");
	const [search, setSearch] = useState("");

	return (
		<>
			<NavBar />
			<div className="grid grid-flow-col mt-10 mx-5">
				<div className="col-span-1 max-w-[280px]">
					<AddAndSort sortBy={setSortedBy} search={setSearch} />
				</div>
				<div className="col-span-10">
					<Accounts sortedBy={sortedBy} searched={search} />
				</div>
			</div>
		</>
	);
};

export default AccountsPage;
