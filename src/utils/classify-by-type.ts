import {
	ConcatSameRoute,
	CsvRecord,
	SameRouteByWebVitalsType,
	WEB_VITALS_TYPE,
	WebVitalsType
} from '../types';

// 同页面下的拼接为同一条数组
const concatEntries = (arr:CsvRecord[]) => arr.reduce((acc, cur) => {
	// 没有对应键就挂载，有就推入刚来的数据
	// eslint-disable-next-line no-unused-expressions
	acc[cur.href] ? acc[cur.href].push(...cur.entries) : acc[cur.href] = cur.entries;
	return acc;
}, {} as any) as ConcatSameRoute;

const classifyEntriesByWebVitalsType = (obj:ConcatSameRoute) => {
	const objKetyArr = Object.keys(obj);
	return objKetyArr.reduce((acc, cur) => {
		// 过滤掉上报量少于 500 的
		if (obj[cur].length < 500) return acc;
		acc[cur] = {};
		WEB_VITALS_TYPE.forEach((type) => { acc[cur][type] = []; });
		obj[cur].forEach((item) => {
			const typeArr = Object.keys(item) as WebVitalsType[];
			typeArr.forEach((type) => {
				// 判空
				if (typeof item[type] === 'number') acc[cur][type].push(item[type]);
			});
		});
		return acc;
	}, {} as any) as SameRouteByWebVitalsType;
};

export const classifyByType = (arr:CsvRecord[]) => {
	const temp = concatEntries(arr);
	return classifyEntriesByWebVitalsType(temp);
};