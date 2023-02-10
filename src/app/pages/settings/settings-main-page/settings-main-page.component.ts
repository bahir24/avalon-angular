import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableExampleService } from "../../../services/observable-example/observable-example.service";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {SettingsService} from "../../../services/settings/settings.service";
import {ISettings} from "../../../models/settings";

@Component({
  selector: 'app-settings-main-page',
  templateUrl: './settings-main-page.component.html',
  styleUrls: ['./settings-main-page.component.scss']
})
export class SettingsMainPageComponent implements OnInit, OnDestroy {
  private subjectScope!: Subject<string>;
  private subjectScopeSubscription!: Subscription;
  private unsubscribeNotifier = new Subject<void>()
  private settingsData!: Subscription;
  private settingsDataSubject!: Subscription;

  constructor(private readonly observableExampleService: ObservableExampleService,
              private readonly settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsData = this.settingsService.loadUserSettings()
      .pipe(takeUntil(this.unsubscribeNotifier))
      .subscribe((data: ISettings) => {
      console.log('settings data ', data);
    })
    this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable()
      .pipe(take(1))
      .subscribe((data: ISettings) => {
        console.log('settings data from subject ', data);
      })
    this.subjectScope = this.observableExampleService.getSubject();
    this.subjectScopeSubscription = this.subjectScope.pipe(
      takeUntil(this.unsubscribeNotifier)
    ).subscribe(
      (value: string) => console.log(value)
    );
    this.subjectScope.next('some');
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next();
    this.unsubscribeNotifier.complete();
  }

}
