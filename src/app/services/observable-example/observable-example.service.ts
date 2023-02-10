import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
  private subject = new Subject<string>();
  constructor() { }

  public getSubject(): Subject<string> {
    return this.subject;
  }
}
