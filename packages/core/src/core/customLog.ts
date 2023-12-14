import ErrorStackParser from 'error-stack-parser';
import { transportData } from './reportData';
import { breadcrumb } from './breadcrumb';
import { EVENTTYPES, STATUS_CODE } from '@websee/common';
import { isError, getTimestamp, unknownToString } from '@websee/utils';

// 自定义上报事件
export function log({ message = 'customMsg', error = '', type = EVENTTYPES.CUSTOM }: any): void {
  try {
    let errorInfo = {};
    if (isError(error)) {
      const result = ErrorStackParser.parse(!error.target ? error : error.error || error.reason)[0];
      errorInfo = { ...result, line: result.lineNumber, column: result.columnNumber };
    }
    breadcrumb.push({
      type,
      status: isError(error) ? STATUS_CODE.ERROR : STATUS_CODE.OK,
      category: breadcrumb.getCategory(EVENTTYPES.CUSTOM),
      data: unknownToString(message),
      time: getTimestamp(),
    });
    transportData.send({
      type,
      status: isError(error) ? STATUS_CODE.ERROR : STATUS_CODE.OK,
      message: unknownToString(message),
      time: getTimestamp(),
      ...errorInfo,
    });
  } catch (err) {
    // console.log('上报自定义事件时报错：', err);
  }
}
