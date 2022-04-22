import { readFileSync } from 'fs';
import { join } from 'path';
import { utils, writeFile } from 'XLSX';
import { readDir } from './read-dir';
import { JSON_TO_XLSX } from '../types';

const jsonFileNameArr = readDir('output-json');
const jsonFolderPath = join(__dirname, '../output-json');

export const assembleJsonIntoXlsx = () => {
	const keyArr = Object.keys(JSON_TO_XLSX);
	const fileArrByKey = keyArr.map((key) => jsonFileNameArr.filter((name) => name.includes(key)));

	while (fileArrByKey.length > 0) {
		const tobeAssembleFileArr = fileArrByKey.pop() as string[];
		const workbook = utils.book_new();
		tobeAssembleFileArr.forEach((fileName) => {
			const fileStr = readFileSync(join(jsonFolderPath, fileName)).toString();
			const fileObj = JSON.parse(fileStr);
			// 把表格式们塞入同一个文件内
			utils.book_append_sheet(workbook, utils.json_to_sheet(fileObj), fileName);
		});
		const xlsxFileName = JSON_TO_XLSX[keyArr.at(-1) as keyof typeof JSON_TO_XLSX];
		writeFile(workbook, `src/output-xlsx/${xlsxFileName}`);
	}
};