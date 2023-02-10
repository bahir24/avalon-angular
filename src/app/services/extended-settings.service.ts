import { EventEmitter, Injectable } from '@angular/core';
import { IMenuType } from "../models/menuType";

@Injectable({
  providedIn: 'root'
})
export class ExtendedSettingsService {
  public extendedSetting: EventEmitter<IMenuType> = new EventEmitter<IMenuType>();
}
