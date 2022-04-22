import { writeFileSync } from 'fs';
import { join } from 'path';

const outputJsonPath = join(__dirname, '../output-json');

/**
 * arr: 用于写入的数组
 * name: 文件名
 * root: 默认是src/output-json的路径，可另外指定
 */
export const writeArrIntoJson = (arr:any[], name:string, root:string = outputJsonPath) => {
	try {
		writeFileSync(join(root, name), JSON.stringify(arr, null, 4));
	} catch (e) {
		console.error('writeArrIntoJson error', (e as Error).toString());
	}
};