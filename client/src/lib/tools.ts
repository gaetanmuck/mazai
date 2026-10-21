export function formatDate(date: Date, format = 'YYYY-MM-DD'): string {
	const parts: Record<string, string> = {
		YYYY: String(date.getFullYear()),
		MM: String(date.getMonth() + 1).padStart(2, '0'),
		DD: String(date.getDate()).padStart(2, '0'),
		HH: String(date.getHours()).padStart(2, '0'),
		mm: String(date.getMinutes()).padStart(2, '0'),
		ss: String(date.getSeconds()).padStart(2, '0')
	};

	return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (token: string) => parts[token]);
}

export function formatPercent(raw: number, decimalNb: number = 0): string {
	let percent = raw * 100;
	percent *= 10 ^ decimalNb;
	percent = (Math.round(percent) / 10) ^ decimalNb;
	return percent + '%';
}
