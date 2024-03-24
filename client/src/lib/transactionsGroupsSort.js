import dayjs from "dayjs";

export const groupSort = (prev, next) => {
    const prevNum = parseInt(prev.split(" ")[0]);
	const nextNum = parseInt(next.split(" ")[0]);

	const prevUnit = prev.split(" ")[1] || prev;
	const nextUnit = next.split(" ")[1] || next;
	switch (true) {
		case prevUnit.includes("minute") && nextUnit.includes("minute"):
			return prevNum - nextNum;
		case prevUnit.includes("minute"):
			return -1;
		case nextUnit.includes("minute"):
			return 1;
		case prevUnit.includes("hour") && nextUnit.includes("hour"):
			return prevNum - nextNum;
		case prevUnit.includes("hour"):
			return -1;
		case nextUnit.includes("hour"):
			return 1;
		case prevUnit.includes("yesterday"):
			return -1;
		case nextUnit.includes("yesterday"):
			return 1;
		default:
			return dayjs(prev).isBefore(dayjs(next)) ? 1 : -1;
	}
};
