import { RequestParams } from '../../common/custom_types';

export interface BaseTable {
  name: string;
  prefix?: string;
  alias: RequestParams;
  cols: RequestParams;
  ins: RequestParams;
  colAlias: RequestParams;
}
