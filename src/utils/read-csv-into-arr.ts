import { readFile, utils } from 'XLSX';
import { join } from 'path';
import { CsvRecord, csvRecordKeyArr, WebVitalsRecord } from '../types';

const csvDirPath = join(__dirname, '../source-csv');

export const readCsvIntoArr = (fileNameArr: Array<string>) => {
	let arr:Array<CsvRecord> = [];
	let undefinedEntriesCount = 0;

	try {
		fileNameArr.forEach((fileName) => {
			const workbook = readFile(join(csvDirPath, fileName));
			const rawCsvEntryArr:any[] = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
			const innerArr:CsvRecord[] = rawCsvEntryArr.map((item:any) => {
				const res = {} as any;
				csvRecordKeyArr.forEach((key) => {
					if (key !== 'entries') {
						res[key] = item[key];
					} else {
						let entries;
						try {
							entries = JSON.parse(item[key]);
						} catch (e) {
							entries = [];
							undefinedEntriesCount++;
						}
						// 将entries的元素的值从string转为number
						res.entries = entries.map((entry:WebVitalsRecord) => {
							const keys = Object.keys(entry);
							return keys.reduce((acc, cur) => {
								acc[cur] = Number((entry as any)[cur]);
								return acc;
							}, {} as any);
						});
					}
				});
				return res;
			});

			arr = arr.concat(innerArr);
		});
		console.log(`
undefined entries count is: ${undefinedEntriesCount}
from  ${JSON.stringify(fileNameArr)} `);
	} catch (e) {
		arr = [];
		console.error('readCsvIntoArr error', (e as Error).toString());
	}

	return arr;
};