import { Injectable } from '@angular/core';
import {Observable, Subject, Subscriber} from "rxjs";
import {ISettings} from "../../models/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject = new Subject<ISettings>();
  constructor() {
  }

  loadUserSettings(): Observable<ISettings> {
    const settingsObservable = new Observable<ISettings>((subscriber: Subscriber<ISettings>) => {
      const settingsData: ISettings = {
        saveToken: true
      }
      subscriber.next(settingsData);
    });
    return settingsObservable;
  }

  loadUserSettingsSubject(data: ISettings): void {
    this.settingsSubject.next(data);
  }

  getSettingsSubjectObservable(): Observable<ISettings> {
    return this.settingsSubject.asObservable();
  }
}
