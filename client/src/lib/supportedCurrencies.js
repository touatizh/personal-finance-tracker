let currencies = {
	USD: "United States Dollar",
	EUR: "Euro",
	JPY: "Japanese Yen",
	GBP: "British Pound Sterling",
	AUD: "Australian Dollar",
	CAD: "Canadian Dollar",
	CHF: "Swiss Franc",
	CNY: "Chinese Yuan",
	SEK: "Swedish Krona",
	NZD: "New Zealand Dollar",
	MXN: "Mexican Peso",
	SGD: "Singapore Dollar",
	HKD: "Hong Kong Dollar",
	NOK: "Norwegian Krone",
	KRW: "South Korean Won",
	TRY: "Turkish Lira",
	RUB: "Russian Ruble",
	INR: "Indian Rupee",
	BRL: "Brazilian Real",
	ZAR: "South African Rand",
	DKK: "Danish Krone",
	PLN: "Polish Złoty",
	IDR: "Indonesian Rupiah",
	THB: "Thai Baht",
	SAR: "Saudi Riyal",
	TWD: "New Taiwan Dollar",
	MYR: "Malaysian Ringgit",
	AED: "United Arab Emirates Dirham",
	PHP: "Philippine Peso",
	CZK: "Czech Koruna",
	HUF: "Hungarian Forint",
	CLP: "Chilean Peso",
	PKR: "Pakistani Rupee",
	COP: "Colombian Peso",
	QAR: "Qatari Riyal",
	BGN: "Bulgarian Lev",
	RON: "Romanian Leu",
	DOP: "Dominican Peso",
	KWD: "Kuwaiti Dinar",
	VND: "Vietnamese Đồng",
	PEN: "Peruvian Sol",
	NGN: "Nigerian Naira",
	BHD: "Bahraini Dinar",
	EGP: "Egyptian Pound",
	OMR: "Omani Rial",
	MAD: "Moroccan Dirham",
	CUP: "Cuban Peso",
	GHS: "Ghanaian Cedi",
	UAH: "Ukrainian Hryvnia",
	JOD: "Jordanian Dinar",
	LKR: "Sri Lankan Rupee",
	UYU: "Uruguayan Peso",
	MOP: "Macanese Pataca",
	UZS: "Uzbekistani Som",
	BDT: "Bangladeshi Taka",
	LBP: "Lebanese Pound",
	IQD: "Iraqi Dinar",
	AZN: "Azerbaijani Manat",
	TND: "Tunisian Dinar",
	PAB: "Panamanian Balboa",
	NPR: "Nepalese Rupee",
	LYD: "Libyan Dinar",
	CRC: "Costa Rican Colón",
	BMD: "Bermudian Dollar",
	ANG: "Netherlands Antillean Guilder",
	BAM: "Bosnia and Herzegovina Convertible Mark",
	MUR: "Mauritian Rupee",
	MZN: "Mozambican Metical",
	ARS: "Argentine Peso",
	BYN: "Belarusian Ruble",
	HRK: "Croatian Kuna",
	FJD: "Fijian Dollar",
	BBD: "Barbados Dollar",
};

currencies = Object.fromEntries(
	Object.entries(currencies).sort(([, a], [, b]) => a.localeCompare(b))
);

export default currencies;
