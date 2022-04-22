// WebVitals的类型
export const WEB_VITALS_TYPE = ['CLS', 'FCP', 'FID', 'LCP', 'TTFB'] as const;
export type WebVitalsType = (typeof WEB_VITALS_TYPE)[number]

// 上报的每个
export type WebVitalsRecord = {
    // eslint-disable-next-line no-unused-vars
    [key in WebVitalsType]?: number;
}

// Csv的每一行
export interface CsvRecord {
    appversion: number,
    devicetype: string,
    entries: Array<WebVitalsRecord>,
    href: string,
    mobile_model: string,
    systemversion: number
}
// 没有简单的从interface里得到key数组的方式，不引入包就只能这样了
export const csvRecordKeyArr:Array<keyof CsvRecord> = [
	'appversion',
	'devicetype',
	'entries',
	'href',
	'mobile_model',
	'systemversion'
];

// 同一href下的所有entries拼接在一起之后的大对象
export interface ConcatSameRoute {
    [key: string]: Array<WebVitalsRecord>
}
// 同一href下根据WebVitalsType归类出各自数组
export interface SameRouteByWebVitalsType {
    [key: string]: {
        // eslint-disable-next-line no-unused-vars
        [key in WebVitalsType]: Array<number>
    }
}
