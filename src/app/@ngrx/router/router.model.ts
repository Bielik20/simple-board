import { Params } from '@angular/router';
import { Data } from '@angular/router/src/config';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}
