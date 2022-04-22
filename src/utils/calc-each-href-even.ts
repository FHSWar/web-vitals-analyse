import { SameRouteByWebVitalsType, WEB_VITALS_TYPE } from '../types';
import { calcPercentage } from './calc-percentage';
import { writeArrIntoJson } from './write-arr-into-json';

// 计算每个href个web-vitals type的均值和触发次数
export const calcEachHrefEven = (obj:SameRouteByWebVitalsType, name:string) => {
	const keys = Object.keys(obj);
	const result = keys.map((key) => {
		// 方便看主要内容
		const pageObj:any = {
			page: key
				.replace('https://salescmscdn.pa18.com/as/', '')
				.replace('http://salescmscdn.pa18.com/as/', '')
		};
		WEB_VITALS_TYPE.forEach((type) => {
			const numArr = obj[key][type].map(Number).sort((a, b) => a - b);
			const sum = numArr.reduce((acc, cur) => acc += cur, 0);
			const len = obj[key][type].length;
			const even = Number((sum / len).toFixed(3)) || ((sum / len === 0) ? 0 : '-');

			pageObj[`${type}均值`] = even;
			pageObj[`${type}次数`] = len;

			if (type === 'LCP') {
				const smallerThanOneCount = numArr.filter((num) => num < 1000).length;
				const smallerThanTwoCount = numArr.filter((num) => num < 2000).length;
				pageObj[`${type}小于1s占比`] = calcPercentage(smallerThanOneCount, len);
				pageObj[`${type}小于2s占比`] = calcPercentage(smallerThanTwoCount, len);
			}
		});

		// 方便访问调试
		pageObj.link = key.replace('salescmscdn.pa18.com/as', 'pssdevopsbd.pa18.com/stg1/as');

		return pageObj;
	});
	writeArrIntoJson(result, `${name}各类型均值.json`);
};