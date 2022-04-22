import { readDir } from './read-dir';

const fileArr = readDir('source-csv');

// 字符串数组去重
const dedup = (arr: Array<string>) => Array.from(new Set(arr));
const truncat = (arr: Array<string>) => arr.map((str) => str.split('-')[0]);

// 相同项目‘-’之前的部分相同，可以以此区分出不同单页面
export const getSinglePageArr = () => {
	// 这都是基于csv文件名格式行如login-0312.csv的前提来写的
	const singlePageWithoutDateArr = truncat(fileArr);
	return dedup(singlePageWithoutDateArr);
};

export const classifyCsv = () => {
	const singlePageArr = getSinglePageArr();
	const classifiedCsv = singlePageArr.map((singlePage) => fileArr.filter((file) => file.startsWith(singlePage)));

	// 返回二维数组，每一个元素是包含属于同一个单页面的数据的文件名数组
	return classifiedCsv;
};