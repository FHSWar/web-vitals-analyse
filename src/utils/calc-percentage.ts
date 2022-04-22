export const calcPercentage = (numerator:number, denominator:number) => {
	if (numerator / denominator) { // truthy 就能算
		if (numerator / denominator === 0) return 0;
		return `${(numerator / denominator * 100).toFixed(2)}%`;
	}
	return '-';
};