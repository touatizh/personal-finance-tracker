import {
	Link,
	Button,
	Image,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";

const NavBar = () => {
	const location = useLocation();

	const isActive = (path) => {
		return location.pathname === path;
	};
	return (
		<Navbar
			className="bg-white"
			maxWidth="full"
			isBordered
			shouldHideOnScroll>
			<NavbarBrand className="sm:max-w-[200px]">
				<Image
					width={80}
					alt="app logo"
					src="./src/assets/img/logo.png"
				/>
				<p className="font-bold text-text-darkest text-2xl">Unveil</p>
			</NavbarBrand>
			<NavbarContent className="sm:flex gap-8" justify="start">
				<NavbarItem isActive={isActive("/dashboard")}>
					<Link
						className=" text-lg text-text-darkest hover:text-secondary-700"
						href="/dashboard">
						Dashboard
					</Link>
				</NavbarItem>
				<NavbarItem isActive={isActive("/accounts")}>
					<Link
						className=" text-lg text-text-darkest hover:text-secondary-700"
						href="/accounts">
						Accounts
					</Link>
				</NavbarItem>
				<NavbarItem isActive={isActive("/transactions")}>
					<Link
						className=" text-lg text-text-darkest hover:text-secondary-700"
						href="/transactions">
						Transactions
					</Link>
				</NavbarItem>
				<NavbarItem isActive={isActive("/reports")}>
					<Link
						className=" text-lg text-text-darkest hover:text-secondary-700"
						href="/reports">
						Reports
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<Link
						className=" text-lg text-text-darkest hover:text-secondary-700"
						href="/logout">
						Logout
					</Link>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default NavBar;
