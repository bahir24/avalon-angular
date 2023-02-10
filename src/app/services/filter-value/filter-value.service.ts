import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class FilterValueService {
  public filterValue = '';
  public valueEmitter = new EventEmitter<string>();
}
