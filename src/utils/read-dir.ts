import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const srcPath = join(__dirname, '..');
const shouldIgnoreDir = ['.DS_Store'];

/**
 * dirName: 文件夹名称
 * wantFile: 是否要文件，为否返回root下满足条件的文件夹
 * root: 默认是src的路径，可另外指定
 */
export const readDir = (dirName:string, wantFile:boolean = true, root:string = srcPath) => {
	const destPath = join(root, dirName);
	const fileOrDirArr:Array<string> = [];

	try {
		const arr = readdirSync(destPath).filter((item) => {
			const temp = join(destPath, item);
			// 不是目录且不以.开头的文件们
			if (wantFile) return !statSync(temp).isDirectory() && !item.startsWith('.');
			// 是目录且不在被排除清单内
			return statSync(temp).isDirectory() && !shouldIgnoreDir.includes(item);
		});
		arr.forEach((item) => fileOrDirArr.push(item));
	} catch (e) {
		console.error('readDir error', (e as Error).toString());
	}

	// 返回文件数组或目录数组
	return fileOrDirArr;
};
