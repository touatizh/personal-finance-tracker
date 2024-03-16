import dayjs from "dayjs";

export function timeAgo(res) {
	res.data.forEach((trans) => {
		const transDate = dayjs(trans.date_time);
		const now = dayjs();
		let timePassed = now.diff(transDate, "hours");
		switch (true) {
			case timePassed < 1:
				timePassed = now.diff(transDate, "minutes");
				trans.ago = `${timePassed} minutes ago`;
				break;
			case timePassed >= 1 && timePassed < 24:
				trans.ago = `${timePassed} hour(s) ago`;
				break;
			case timePassed >= 24 && timePassed < 48:
				trans.ago = "Yesterday";
				break;
			default:
				trans.ago = transDate.format("MMMM D");
				break;
		}
	});
	return res.data;
}
