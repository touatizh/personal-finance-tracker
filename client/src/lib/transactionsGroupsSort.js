import dayjs from "dayjs";

export const groupSort = (prev, next) => {
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
			return dayjs(prev).isBefore(dayjs(next));
	}
};
