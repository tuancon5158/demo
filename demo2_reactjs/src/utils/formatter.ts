export function FormatNumber(num: number, decimals: number) {
	const t = 10 ** decimals
	return (
		Math.round(
			num * t + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / 100 ** decimals))
		) / t
	).toFixed(decimals)
}
