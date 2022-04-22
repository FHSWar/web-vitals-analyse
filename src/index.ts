import { classifyCsv, getSinglePageArr } from './utils/classify-csv';
import { readCsvIntoArr } from './utils/read-csv-into-arr';
import { classifyByType } from './utils/classify-by-type';
import { calcEachHrefEven } from './utils/calc-each-href-even';
import { assembleJsonIntoXlsx } from './utils/assemble-json-into-xlsx';

console.time('analyse');

const singlePageArr = getSinglePageArr();
const classifiedCsvArr = classifyCsv();

while (classifiedCsvArr.length > 0) {
	// classifiedCsvArr长度大于零时一定能pop出数组，singlePageArr同理
	const singlePageCsvArr = classifiedCsvArr.pop() as Array<string>;
	const singlePageName = singlePageArr.pop() as string;

	// 没内容也能得到空数组
	const csvRecordArr = readCsvIntoArr(singlePageCsvArr);
	const androidCsvRecordArr = csvRecordArr.filter(({ devicetype }) => devicetype === 'Android');

	const toBeAnalyse = classifyByType(androidCsvRecordArr);

	calcEachHrefEven(toBeAnalyse, singlePageName);
}

assembleJsonIntoXlsx();

console.timeEnd('analyse'); // analyse: 1:12.711 (m:ss.mmm) 500M 的 CSV 数据
