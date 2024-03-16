import { useState } from "react";
import AccountDetails from "../components/containers/AccountDetails";
import NavBar from "../components/containers/NavBar";

const AccountDetailsPage = () => {
	return (
		<>
			<NavBar />
			<div className="m-10">
				<AccountDetails />
			</div>
		</>
	);
};

export default AccountDetailsPage;
